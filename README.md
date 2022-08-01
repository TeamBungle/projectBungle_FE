![슬랙 홍보용 이미지.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09fb6a34-de5c-4692-8bd6-5f1454534f77/__.png)

**싱글벙글, 사용자 현재 위치 기반으로 빠르게 주변 모임을 확인할 수 있습니다.**

### 🤔 프로젝트 시장 조사 및 Feasibility Test

[Feasibility test](https://www.notion.so/Feasibility-test-b8f7d2dccd354a0db0577e245a12f4a4) 

### 🙂 아키텍쳐

![벙글 아키텍쳐.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2425d948-7a2c-4b8c-aa64-f03baea3a3bc/_.png)

### 🤩 벙글 주요 기능

1. GPS를 사용한 현재 위치 확인 ( geolocation )
    - 사용자 위치 기준, 400km 반경의 실시간 벙글 위치와 마감 임박순 벙글 을 나타냄
    - 서비스 론칭 기간이 짧기 때문에 400km로 결정, 추후 데이터가 많이 쌓이면 50km로 변경 예정
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08fc6038-5f8a-4c7e-a2dc-3de7b2000c80/Untitled.png)
    

1. 실시간 벙글 생성 및 문자 채팅 ( Redis, StompJS, SockJS )
    - 벙글 생성을 통해 주변 사람들과 모임을 가질 수 있고 문자 채팅에서 상세 결정을 내릴 수 있음
    - 사용자 피드백에 따라 화상 채팅 추가 예정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b96c15b5-30a1-40c2-92b1-e985ed93eb15/Untitled.png)

1. 지도를 통해 실시간 진행 중인 벙글 확인 ( Redis, Kakao map API )

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/61ff04ab-3d2c-41b3-b458-2101a393c73f/Untitled.png)

### 🧐 Trouble Shooting

- BE Trouble Shooting
    
    
    | 구분 | 요구사항 | 선택지 | 핵심 기술을 선택한 이유 및 근거 |
    | --- | --- | --- | --- |
    | BE | 사용자 위치에 따른 정보 검색 및 데이터 정렬 | 1. JPA Data 사용
    2. Native Query 사용 | [2번 선택]
    - Kakao Geocoding을 통해 DB에 저장된 위도, 경도 정보를 조회시 Native Query를 사용하여 Query 조회 성능 향상 |
    | BE | 모임전 유저간 실시간 정보 공유 할 수 있는 채팅 서비스를 제공 | 1. 실시간 채팅 라이브러리( ex> PeerJS )
    2. Stomp, SockJS, Redis pub/sub | [2번 선택]
    - Websocket에 대한 전반적인 이해도가 부족한 상태에서, 라이브러리를 통해 구현하려고 하다보니 개발이 잘 진행 되지 않음
    - 채팅 서버가 여러개로 나뉠경우, Spring 에서 제공하는 내장 broker로는 서로 다른 서버에 요청을 보낸 사용자끼리 채팅이 불가 하여 Reids pub/sub 방식을 사용 |
    | BE | 채팅 메세지를 저장하고, 채팅방에 입장했을때 그전에 보냈던 메세지들을 불러오는 방식 | 1. Mysql 사용
    2. Redis Cache사용 | - 매번 채팅방에 입장 할 때마다 DB에서 조회해오는 방식을 사용하면 성능이 떨어질 것으로 예상하여, 메세지를 저장할때는 Reids와 DB에 같이 저장하고, 메세지를 조회해올경우에는  Redis Cache를 사용하여 메세지를 불러오며, Reids에 저장되어있는 데이터가 손실 되었을 경우, DB에서 조회하도록 로직을 구성. |
    | BE | 읽지 않은 메세지에 대한 알림기능 구현 | 1. Websocket을 사용하여 실시간 알림 
    2. SSE를 사용하여 실시간 알림
    3. http를 사용하여 알림 | [3번 선택]
    - 프로젝트 마무리 시간을 고려하여, 시간이 충분히 여유롭지 않아 제일 익숙한 방식인 http를 이용하여 알림을 구현하기로 함
    -  front에서 5초마다 알림을 조회하는 요청을 보내고 그에대한 응답으로 사용자가 채팅방에서 나간 시간을 저장하여, 그시간 이후로 그방에서 보내진 메세지들을 return시켜줌. |
    | BE | 회원 가입시 사용자 인증 | 1. Email 인증
    2. OAuth 사용
    3. only Id/Password | [1, 2번 선택]
    - 일반 회원 가입의 경우 가입에 사용한 email로 인증 토큰을 전달후 유저가 해당 토큰을 다시 서버로 전달 하면 서비스를 사용할 수 있도록 권한 변경
    - Oauth를 통해 유저들에게 친숙한 3개의 대형회사에 접근 권한 인증을 위임하여 신규 서비스의 단점인 신뢰성을 보강 |
    | BE | 서비스 이용시 탈취 될 수 있는 유저 정보 보안 방법 | 1. Access Token 만 사용
    2. Access , Refresh Token 함께 사용 | [2 번 선택]
    - Client에서 Server로 요청시 사용자 인증을 위해 전달하는 Access Token이 중간에 탈취 되면, 탈취 한사람이 원래의 유저의 권한을 획득하여 서비스를 악용할 우려가 있어 이를 방지 하기 위해 Access Token의 만료 시간 짧게 두어 탈취 되었을 경우 악용가능한 시간을 줄였으며, 만료된 토큰을 갱신 하여 새로 발급하기 위해 Refresh Token을 함께 사용 |
    
    | 구분 | 요구사항 | 선택지 | 핵심 기술을 선택한 이유 및 근거 |
    | --- | --- | --- | --- |
    | BE | 사용자 위치에 따른 정보 검색 및 데이터 정렬 | 1. JPA Data 사용
    2. Native Query 사용 | [2번 선택]
    - Kakao Geocoding을 통해 DB에 저장된 위도, 경도 정보를 조회시 Native Query를 사용하여 Query 조회 성능 향상 |
    | BE | 모임전 유저간 실시간 정보 공유 할 수 있는 채팅 서비스를 제공 | 1. 실시간 채팅 라이브러리( ex> PeerJS )
    2. Stomp, SockJS, Redis pub/sub | [2번 선택]
    - Websocket에 대한 전반적인 이해도가 부족한 상태에서, 라이브러리를 통해 구현하려고 하다보니 개발이 잘 진행 되지 않음
    - 채팅 서버가 여러개로 나뉠경우, Spring 에서 제공하는 내장 broker로는 서로 다른 서버에 요청을 보낸 사용자끼리 채팅이 불가 하여 Reids pub/sub 방식을 사용 |
    | BE | 채팅 메세지를 저장하고, 채팅방에 입장했을때 그전에 보냈던 메세지들을 불러오는 방식 | 1. Mysql 사용
    2. Redis Cache사용 | - 매번 채팅방에 입장 할 때마다 DB에서 조회해오는 방식을 사용하면 성능이 떨어질 것으로 예상하여, 메세지를 저장할때는 Reids와 DB에 같이 저장하고, 메세지를 조회해올경우에는  Redis Cache를 사용하여 메세지를 불러오며, Reids에 저장되어있는 데이터가 손실 되었을 경우, DB에서 조회하도록 로직을 구성. |
    | BE | 읽지 않은 메세지에 대한 알림기능 구현 | 1. Websocket을 사용하여 실시간 알림 
    2. SSE를 사용하여 실시간 알림
    3. http를 사용하여 알림 | [3번 선택]
    - 프로젝트 마무리 시간을 고려하여, 시간이 충분히 여유롭지 않아 제일 익숙한 방식인 http를 이용하여 알림을 구현하기로 함
    -  front에서 5초마다 알림을 조회하는 요청을 보내고 그에대한 응답으로 사용자가 채팅방에서 나간 시간을 저장하여, 그시간 이후로 그방에서 보내진 메세지들을 return시켜줌. |
    | BE | 회원 가입시 사용자 인증 | 1. Email 인증
    2. OAuth 사용
    3. only Id/Password | [1, 2번 선택]
    - 일반 회원 가입의 경우 가입에 사용한 email로 인증 토큰을 전달후 유저가 해당 토큰을 다시 서버로 전달 하면 서비스를 사용할 수 있도록 권한 변경
    - Oauth를 통해 유저들에게 친숙한 3개의 대형회사에 접근 권한 인증을 위임하여 신규 서비스의 단점인 신뢰성을 보강 |
    | BE | 서비스 이용시 탈취 될 수 있는 유저 정보 보안 방법 | 1. Access Token 만 사용
    2. Access , Refresh Token 함께 사용 | [2 번 선택]
    - Client에서 Server로 요청시 사용자 인증을 위해 전달하는 Access Token이 중간에 탈취 되면, 탈취 한사람이 원래의 유저의 권한을 획득하여 서비스를 악용할 우려가 있어 이를 방지 하기 위해 Access Token의 만료 시간 짧게 두어 탈취 되었을 경우 악용가능한 시간을 줄였으며, 만료된 토큰을 갱신 하여 새로 발급하기 위해 Refresh Token을 함께 사용 |
- FE Trouble Shooting
    
    
    |  | 요구사항 | 선택지 | 핵심 기술을 선택한 이유 및 근거 |
    | --- | --- | --- | --- |
    | FE | 카카오 지도 API 적용 | 1. 네이버 지도 API 활용
    2. 카카오 지도 API 활용 | [2번 선택 ]
    - 네이버 지도 API의 경우, 곧 서비스가 만료된다는 것을 확인하고 카카오 지도 API를 적용
    - 개발자가 쉽게 접근할 수 있는 다양한 예제 코드가 잘 되어 있기에 선정 |
    | FE | 실시간 채팅 구현 | 1. 실시간 채팅 라이브러리( ex> PeerJS )
    2. StompJS, SockJS | [2번 선택]
    - Websocket에 대한 이해가 부족한 상태에서 채팅 라이브러리를 통해 구현을 하려하다보니, 원활한 개발이 되지 않음
    - Websocket에 대해 이해를 하고자 하니, StompJS와 SockJS를 활용하여 직접 Spring 과 소통하는 방법을 알아야 할 필요성을 느낌
    - 디자인에 맞추어 직접 커스텀 작업을 해야하기 때문에 라이브러리 보다 직접 구현하는 방식이 편하다고 생각함 |
    | FE | Refresh Token 적용 | 1. Back end에서 만료 시간이 지나면 response로 refresh와 access token 전송
    2. Front에서 만료 시간이 지나면 서버에 요쳥하여 refresh와 access token 재발급 | [2번 선택]
    데이터를 요청할 때마다 access token의 만료 기간을 판단하는 로직이 맞다고 판단되어 적용
    - axios interceptor로 요청하기 전에 만료 기간을 확인하여 서버로 요청
    - 만료 기간 요청을 처리하기 위해 monent 라이브러리를 사용
    - refresh Token은 Cookie의 옵션 관리 ( scure, httpOnly )로 보안을 강화할 수 있다고 판단하여 react-cookies를 활용하여 Cookie에 저장 |
    | FE | AWS CloudFront 배포 | 사용자에게 빠른 서비스를 제공할 수 있는 기술을 검토 | 캐싱을 통해 사용자에게 좀 더 빠른 전송 속도를 제공할 수 있다고 판단하여 적용
    <참고 링크>
    https://dev.classmethod.jp/articles/how-fast-is-cloudfront-speed-test/ |
    | FE | 로그인 하지 않은 사용자가 로그인이 필요한 페이지로 강제 접근할 때 제한을 두는 기능이 필요 | 1. 모달창을 통해 로그인 후 서비스 이용하라는 메세지 출력
    2. Private Routes 적용 | [2번 선택]
    - 사용자에게 모달창을 띄워 직접 메세지를 전달해주어도 좋지만, 아예 URL 직접 접근을 막아버리는 방안이 더 확실하게 요구사항을 수용할 수 있는 방안이라 판단 |
    | FE | 사용자가 지정 URL 외의 URL을 직접 접근 시 보여줄 페이지가 필요 | 1. 404 페이지 | 지정 URL 외의 페이지를 App.js 파일에서 path = “*”로 지정하여 404페이지를 작성해 놓으면, 모든 경우의 수가 제거된다 판단 |

### 😍 벙글 [서비스 링크 바로가기](https://bungle.life)

### 😆 프로젝트 Git address

- Back-end Github    https://github.com/TeamBungle/projectBungle_BE
- Front-end Github   https://github.com/TeamBungle/projectBungle_FE

### 😶 벙글 팀원 소개( L : 팀장, LV : 부팀장 )

| 역할 | 이름 | Git 주소 |
| --- | --- | --- |
| BE | 강현구님 | https://github.com/kootner |
| BE( LV ) | 김민수님 | https://github.com/minssu86 |
| BE | 김정훈님 | https://github.com/junghoon-kim96 |
| BE | 정현욱님 |  |
| FE | 최서우님 | https://github.com/zerovodka |
| FE | 한결님 | https://github.com/GHan19 |
| FE( L ) | 한지용님 | https://github.com/jigomgom |
| Designer | 양승연님 |  |
