
![배너용](https://user-images.githubusercontent.com/107230384/182052615-f4743530-6596-4b4f-9b5e-6100f021eebb.jpg)

<div align="center"><h3>싱글벙글, 사용자 현재 위치 기반으로 빠르게 주변 모임을 확인할 수 있습니다.</h3></div>

## 🤩 벙글 [서비스 링크 바로가기](https://bungle.life)
## 😖 벙글 [발표 영상 바로가기](https://youtu.be/AoN3nuWR9Hg)
## 🤗 벙글 [시연 영상 바로가기](https://youtu.be/aJnM2TuXXWg)

## 😆 프로젝트 Git address

- Back-end Github    https://github.com/TeamBungle/projectBungle_BE
- Front-end Github   https://github.com/TeamBungle/projectBungle_FE

## 😶 벙글 팀원 소개( L : 팀장, LV : 부팀장 )
<!-- 표 시작 -->
<div align="center">
<table>
      <thead>
        <tr>
          <th>역할</th><th>이름</th><th>개인 Git 주소</th><th>개인 메일 주소</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"></td><td>강현구님</td><td>https://github.com/kootner</td><td>refromto@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"></td><td>( LV ) 김민수님</td><td>https://github.com/minssu86</td><td>manager.kim86@gmail.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"></td><td>김정훈님</td><td>https://github.com/junghoon-kim96</td><td>0527wj@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"></td><td>정현욱님</td><td>https://github.com/Jeonghyeonuk</td><td>junghunwook456@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"></td><td>최서우님</td><td>https://github.com/zerovodka</td><td>264826@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"></td><td>한결님</td><td>https://github.com/GHan19</td><td>gksrufdla@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"></td><td>( L ) 한지용님</td><td>https://github.com/jigomgom</td><td>hjy583@naver.com</td>
        </tr>
        <tr>
          <td><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"></td><td>양승연님</td><td></td><td>didtmddus123@gmail.com</td>
        </tr>
      </tbody>
    </table>
</div>
<!--표 끝-->
<p align="center"><img src="https://user-images.githubusercontent.com/107230384/182984029-9de38ffc-186e-415c-a372-76b2bf59a6dd.png"></p>    



## 🤔 프로젝트 시장 조사 및 Feasibility Test

- <p><a href="https://www.notion.so/Feasibility-test-b8f7d2dccd354a0db0577e245a12f4a4">팀 Feasibility Test 페이지 </a>로 바로가기</p>

## 😏 QA 프로세스
- <p><a href="https://www.notion.so/QA-c3a48710c4f241298990b8413bff3e0d">팀 QA 프로세스 페이지</a>로 바로가기</p>

## 😤 FE 기술 Stack

### React
   - component를 재사용할 수 있음
   - Virtual DOM을 활용하여 UI를 빠르게 렌더링하는 장점
   - Virtual DOM은 또한 이전 UI 상태를 메모리에 유지해서, 변경될 UI의 최소 집합을 계산하는 로직을 포함하는데 이로써 좋은 성능을 내는 장점이 있음

### react-router-dom( v6 )
   - component간 이동을 할 수 있도록 도와주는 라이브러리
   - url에 따라 분기 처리하여 렌더링하기 위해서 선택

### redux toolkit
   - 전역 상태 관리를 할 수 있는 라이브러리
   - 기본 redux보다 간편하고 immer를 관리해줌

### axios
   - 서버와 통신하기 위한 비동기 통신 라이브러리
   - 기본 Data flow를 구성하기 위해 사용

### dotenv
   - React .env를 사용하기 위해 필요한 라이브러리
   - 중요 정보( Back-end server URL, Social Login Client Key ) 등을 .env 파일에서 전역적으로 관리

### moment
   - 시간을 손쉽게 처리하기 위해 사용한 라이브러리
   - Access token의 만료 기간을 설정하여 현재 시간과 비교하여 처리

### react-cookie
   - Refresh token을 안전하게 관리하기 위해 cookie 에 저장하기 쉽도록 도와주는 라이브러리
   - option에 secure, httpOnly 등을 통해 보안을 강화할 수 있음

### StompJS
   - 양방향 커뮤니케이션 적용
   - Publish-Subscribe 매커니즘 제공
   - Stomp를 사용하지 않고 WebsocketHandler( 어떤 형식, 메세지는 어떻게 보낼지 등)를 설정하는 것 보다 형식이 정해져있는 Stomp를 사용하는 것이 더 효율적이라 판단

### Sock JS
   - 순수 WebSocket만 가지고 간단한 채팅을 구현하면 Firefox, Chrome, Edge, Whale에서는 동작하지만, 모바일 크롬 브라우저와 IE에서는 WebSocket이 동작하지 않음 (크로스 브라우징)

### styled-components
   - React 프레임워크를 주요 대상으로 한 CSS 라이브러리.

### react-swipeable-list
   - 찜 목록을 스와이프했을 때 삭제 / 나가기 버튼을 활성화하기 위한 라이브러리

### swiper
   - 간단하게 Carousel( 캐로셀 )을 구현하기 위해 사용한 라이브러리
   - 커스터마이징을 하기 위해서는 오히려 react-slick 이 더욱 간편하다는 의견이 있음

### rc-slider
   - 슬라이드 바를 커스터마이징 하기 위해 사용하는 라이브러리
   - 일반 CSS input type=range로 하게 되면 브라우저 환경마다 다른 슬라이더 이미지를 적용하기 때문에 선택

### CloudFront
   - 캐싱을 통해 사용자에게 좀 더 빠른 전송 속도를 제공함. Edge Server(Location)을 두고 Client에 가장 가까운 Edge Server를 찾아 Latency를 최소화시켜 빠른 데이터를 제공

## 🙂 아키텍쳐

![최종 아키텍처](https://user-images.githubusercontent.com/107230384/182052947-7c29f084-224a-492b-9a71-0c0f09c65a9e.jpg)

## 🤩 벙글 주요 기능

1. GPS를 사용한 현재 위치 확인 ( geolocation )
   - 사용자 위치 기준, 400km 반경의 실시간 벙글 위치와 마감 임박순 벙글 을 나타냄
   - 서비스 론칭 기간이 짧기 때문에 400km로 결정, 추후 데이터가 많이 쌓이면 50km로 변경 예정

<p align="center"><img src="https://user-images.githubusercontent.com/107230384/182052513-562cce1e-09d0-4496-aceb-e17440cf3b22.png" width="920px" height="400px"></p>    

2. 실시간 벙글 생성 및 문자 채팅 ( Redis, StompJS, SockJS )
    - 벙글 생성을 통해 주변 사람들과 모임을 가질 수 있고 문자 채팅에서 상세 결정을 내릴 수 있음
    - 사용자 피드백에 따라 화상 채팅 추가 예정
<p align="center"><img src="https://user-images.githubusercontent.com/107230384/182052538-9e3d28f1-0f7f-4604-a944-35c920fa2aca.png"></p>    

3. 지도를 통해 실시간 진행 중인 벙글 확인 ( Redis, Kakao map API )
<p align="center"><img src="https://user-images.githubusercontent.com/107230384/182052556-d5fb2af0-7617-403a-9e39-a3becd215dd3.png"></p>


## 🧐 Trouble Shooting

- <p><a href="https://github.com/TeamBungle/projectBungle_BE/">BE Trouble Shooting </a>로 바로가기</p>
    

- FE Trouble Shooting
    <details>
    <summary>로그인 시, geolocation 정보 갱신이 안됨</summary>
    <pre>
    1. 문제 인지
      로그인 시, 서버에 geolocation 정보를 전달하여 데이터를 불러오는 과정에서, location을 불러오기 전에 렌더링 되며 문제가 발생
    2. 선택지
      geolocation 함수의 동작 시간과 서버로 데이터를 넘겨주는 비동기적 문제 해결 방법을 검토
    3. 해결방법
      useEffect의 dependency에 location 인자를 전달하여, location 정보가 변경될 때마다 렌더링을 할 수 있도록 수정
    </pre>
    <h5>location dependency 활용</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/a26e741aab0d49111168fcf5e3afa5ea01984253/src/pages/Main.js#L215-L219
    
    </details>
    
    
    <details>
    <summary>Login : 사용자 로그인 보안 강화</summary>
    <pre>
    1. 문제 인지
      - 모임을 주최하는 서비스인만큼, 사용자 정보의 보안이 강화되야 한다고 판단
      - 기존의 Access token 방식으로는 손쉽게 사용자 정보가 탈취될 수 있음
    2. 선택지
      - Refresh Token을 통해 보안을 강화
      - Cookie의 Options( secure 등 )을 통해 보안을 강화할 수 있다고 판단하여 Refresh Token은 Cookie에 저장
      - Access Token은 localStorage에 저장하되, 만료 기간( 30분 )을 체크하여 interceptor로 request 요청 전, 만료 여부를 검증
    </pre>
    <h5>Axios interceptor 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/customapi/Refresh.js#L1-L54
    
    <h5>Axios create 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/customapi/CustomAxios.js#L1-L10
    </details>
    
    <details>
    <summary>Login : 비인가 사용자 URL 막기</summary>
    <pre>
    1. 문제 인지
      로그인 하지 않는 사용자가 URL을 직접 입력해서 다른 페이지로 접근할 수 있는 상황이 발생
    2. 선택지
      로그인 여부를 판별할 수 있는 로직 검토 필요
    3. 해결 방법
      - localStorage에 access_token이 있는지를 확인하여, 사용자의 로그인 여부를 판별
      - Private Route를 만들어 로그인 했을 때 보여줄 페이지만 감싸주고 나머지는 로그인 화면으로 Redirection 할 수 있도록 함
    </pre>
    <h5>Private Route 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/utils/PrivateRoutes.js#L1-L9
    <h5>Private Route로 App.js의 Route 감싸기</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/App.js#L38-L95
    </details>
    
    <details>
    <summary>Chatting : refresh token 이슈로 인한 send 문제</summary>
    <pre>
    1. 문제 인지
      - refresh token을 받아오는 순간에 채팅이 1번 입력이 되지 않는 경우가 발생
      - send 함수의 인자로 access token을 넣어서 보내는데 access token 의 exp 타임이 만료되어 순간적으로 intercept하여 refresh 토큰을 발급하는 경우가 생겨 해당 이슈가 발생했다고 판단
    2. 선택지
      - token이 아닌 다른 방식으로 유저를 구분하는 방법이 있는지 Back end와 의견 공유
	3. 해결 방법
      - 기존 token을 보내는 방식이 아닌 유저의 PK( primary key )를 send 함수 인자로 전달하여 유저를 구분하였음
    </pre>
    <h5>PK send로 대체</h5> 
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/chatting/ChattingRoom.js#L146-L147
    </details>
    
    <details>
    <summary>Chatting : file 전송 문제</summary>
    <pre>
    1. 문제 인지
      - 채팅 시, 파일을 전송하기 위해서는 binary 를 sokect을 통해 전달하여야 함
      - 하지만 binary의 용량이 4MB로 제한되어 있기 때문에 이를 우회할 방법을 모색
    2. 선택지
      - binary를 1024 bit 단위로 쪼개어 전송 후, 서버에서 merge : 기능 구현에 어려움을 느낌
      - formData로 파일을 전송하고 전송된 파일을 Back-end에서 s3 bucket에 업로드 후, 파일 URL을 reponse 해줌
    3. 해결 방법
      - wss가 아닌 https 방식으로 axios 통신을 시도
      - formData로 파일을 전송하고 전송된 파일을 Back-end에서 s3 bucket에 업로드 후, 파일 URL을 reponse 해줌
      - 서버의 redis default 용량을 10MB로 변경하여 좀더 큰 용량의 파일을 처리할 수 있게 함
    </pre>
    <h5>채팅 이미지 전송</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/chatting/ChattingRoom.js#L221-L234	
    
    </details>  
    
    <details>
    <summary>Chatting : 게시물 삭제시, disconnect 요청</summary>
    <pre>
    1. 문제 인지
      - 게시물이 삭제될 때, 채팅이 disconnect 되지 않고 남아있는 현상을 인지
      - 부모, 자식의 compoent가 아니기 때문에 clinet 객체를 props로 detailpost component에 전달할 수 없음
    2. 선택지
      - localStorage에 SockJS client 를 JSON.strpingfy로 저장하고 JSON.parse로 활용하기
      - redux 활용하기
    3. 해결 방법
      - localStorage의 경우, client 객체 속성을 다 담지 못하여 redux의 reducer를 활용하여 client 객체를 저장
      - post 삭제시, redux의 client 객체를 불러와 disconnect 함수를 실행할 수 있었음
    </pre>
    <h5>Redux client 객체 저장</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/redux/modules/BungleSlice.js#L523-L526	
    
    <h5>게시글 삭제시, extraReducer를 활용하여 disconnect</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/redux/modules/BungleSlice.js#L90-L119	
    </details>
    
    <details>
    <summary>Map : 첫 지도 렌더링, 태그 검색 및 상세 정보 검색 시 지도에 바로 마커를 렌더링하지 못하는 상황</summary>
    <pre>
    1. 문제 인지
      데이터는 제대로 불러오는데 해당 데이터를 넣어서 사용할 state 배열이 제대로 업데이트가 되지 않음
    2. 선택지
      - flag를 세워 각 dependency array에 넣을 데이터를 입력
      - 하나의 useEffect() 내에서 조건문을 통해 실행
    3. 해결 방법
      하나의 useEffect() 내에서 조건문을 통해 실행할 경우, dependency array가 공용으로 사용되다보니, 데이터르 제대로 못 넣었다. 그리하여 각 데이터마다 useEffect()를 실행하여 dependency array에 서버에서 받아온 각각의 데이터를 넣어주고 flag state를 만들어 해당 flag일 때 실행되도록 하니 동기적으로 잘 작동함.
    </pre>
    <h5>state 배열 선언 및 관리</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/map/Map.js#L159-L164	
    <h5>렌더링 시 전체 리스트, 태그 검색 리스트 적용 </h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/map/Map.js#L195-L221
    <h5>상세 정보 검색 리스트 적용</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/map/Map.js#L272-L285
    </details>
    
    <details>
    <summary>크로스 브라우징 : Enter Key 문제</summary>
    <pre>
    1. 문제 인지
      기존 PC 개발 환경에서 enter key로 input 입력처리를 하였는데, 모바일 브라우저( Andorid )에서는 enter key 입력이 먹지 않음
    2. 선택지
      - enter key를 쓰지 않고 버튼 입력으로 전환하려 하였으나, 디자인 요소로 인해 반영할 수 없음
      - 공식 문서를 통해 해결 방법을 모색하고자 함 - 참고 링크 : <a href="https://developer.mozilla.org/ko/docs/Web/API/KeyboardEvent/key">MDN KeyboardEvent 사이트</a>
    3. 해결방법
      - MDN 공식 사이트의 KeyboradEvent 예제를 참고하여 android와 iOS의 Key envent를 직접 출력해봄
      - 결과, iOS는 event의 Code로 동작하였으나, android는 event Key로 동작하는 차이점을 발견
    </pre>
    <h5>Login enter key 적용 코드</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/0c974e47c946f0c2ca2456a800ec6c6242e5a2ca/src/pages/user/Login.js#L167-L188
    </details>
    
    
    
    <details>
    <summary>크로스 브라우징 : input 태그 CSS 적용 문제</summary>
    <pre>
    1. 문제 인지
      1차 배포 전, android와 iOS 디바이스 테스트에서 iOS의 safari 브라우저에서 input 태그의 css요소 적용이 안되는 문제를 발견
    2. 선택지
      구글링을 통해 비슷한 사례가 있는지 확인하고 그 문제를 해결하기 위한 해결책이 있는지 검색
    3. 해결방법
      실제 safari에서 그와 같은 문제가 발생하는 것을 확인할 수 있었고, css 를 적용하여 문제를 해결
    </pre>
    <h5>적용 CSS 코드</h5>  
    https://github.com/TeamBungle/projectBungle_FE/blob/a26e741aab0d49111168fcf5e3afa5ea01984253/src/App.css#L29-L40
    </details>
    
    <details>
    <summary>크로스 브라우징 : font 적용 문제</summary>
    <pre>
    1. 문제 인지
      1차 배포 전, android와 iOS 디바이스 테스트에서 iOS의 safari 브라우저에서 font 적용이 되지 않는 문제 발견      
    2. 선택지
      다른 브라우저에서는 해당 "Noto Sans"가 없다면 적용할 수 없다는 사실을 인지
      "Noto Sans"를 적용할 수 있는 다른 방법을 검토
    3. 해결방법
      "Noto Sans"의 font 체를 다운로드 받아 프로젝트에 import 시킴
    </pre>  
    https://github.com/TeamBungle/projectBungle_FE/blob/a26e741aab0d49111168fcf5e3afa5ea01984253/src/index.css#L11-L58
    </details>
 
 ## 😇 성능 테스트
- 채팅 테스트
    
    <details>
    <summary>채팅 Message 조회 부하 문제</summary>
    <pre>
     문제
      - 채팅방에 입장 할 때 이전 메세지를 불러오는 방식에대해서 처음에는 DB에서 바로 조회해오는 방식으로 구상하였으나, 
        해당 방법은 트래픽에 부담이 크지 않을까? 라는 의문과 함께 조회방식에 대한 최적화를 고민
     해결방법
      - memory cache에 저장 후 조회하는 방식이 RDB로부터 불러오는 방식보다 성능이 더 좋다는 것을 조사를 통해 알게 됨
      - 메세지를 저장할 때는 Redis와 DB에 같이 저장하고, 메세지를 조회할 경우에는 Redis Cache를 사용하는 로직 적용 후 테스트 결과
        RDB에서 조회 하는 것 대비 18% 성능 향상을 확인할 수 있었음
      <p align="center"><img src="https://user-images.githubusercontent.com/107230384/183238734-c914cb06-6fca-4364-8406-0b6e751aa08c.png"></p>
    </pre>
    </details>
    
- 게시글 조회 부하 문제

    <details>
    <summary>Geometry 관련 연산 부하 문제</summary>
    <pre>
     문제
      - 게시글 조회시 사용자 위치 정보에 따른 거리 계산 작업이 필요
      - 초기 작업시 거리 계산을 위해 MBRContains 적용시 DB에서 해당 데이터 추출후 거리순 정렬 작업이 추가로 필요하여, 
        Query조회시 거리순 정렬 및 추출을 한번에 할 수 있는 ST_DISTANCE_SPHERE를 사용하는 것이 더 좋다고 판단하여 적용하였지만, 
	부하 테스트 결과 MBRContains 사용시 성능이 더 좋은 결과가 나옴
     해결방법
      - 현재는 게시물 조회시 무한 스크롤이 적용되지 않은 상태에서 테스트한 결과이며, 
        무한 스크롤을 적용한 테스트를 추가로 진행 한후에도 같은 결과가 도출될 시 현재 적용중인 ST_DISTANCE_SPHERE를 MBRContains로 변경 예정
    </pre>
    </details>


## 🤫 유저 피드백 및 반영 사항
<h3>총 개선된 사항[ 9건 ]</h3>
<h4>지도 [ 3건 ]</h4>
<div>
&nbsp;&nbsp;[유저 피드백] 위치가 정확하지 않아요<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 모바일로 접속 시 기기 자체의 GPS 값을 가져오기에 정확하나, PC로 접속 시 IP 기반으로 GPS 값을 가져오기에 다소 부정확<br>
&nbsp;&nbsp;&nbsp;- geolocation의 options 값 변경 및 테스트 필요
</div>

<h4>회원가입 / 로그인 [ 2건 ]</h4>
<div>
&nbsp;&nbsp;[유저 피드벡] 페이지 이동할 때마다 로딩이 너무 길어요<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- CloudFront를 통한 정적 파일의 로딩 시간 감소<br>
&nbsp;&nbsp;[유저 피드벡] 회원 탈퇴 기능을 추가해주세요<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Back-end와 상의하여 회원 탈퇴 API 추가
</div>

<h4>검색 / 게시물 [1건]</h4>
<div>
&nbsp;&nbsp;[유저 피드백] 검색 부분 돋보기 위치, 채팅 input padding 일정하지 않음, 벙글 게시물 참여 인원 사진 비율이 다르게 나옴<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 디자이너와 상의 후, 아이콘 재배치 및 CSS 수정
</div>

<h4>채팅 [ 1건 ]</h4>
<div>
&nbsp;&nbsp;[유저 피드백] 채팅 기능 시 파일첨부를 하게되면 미리보기가 있으면 조금 좋을 것 같습니다.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 사진 업로드 시, 클라이언트가 사진이 업로드되었다는 사실을 확인할 수 있도록, UI 추가
</div>

<h4>메인 [2건]</h4>
<div>
&nbsp;&nbsp;[유저 피드백] 우측상단에 알림표시랑 gps 표시는 메인화면에서 눌러도 아무기능이 없네요
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 메인 화면의 GPS는 클릭 시 현재 위치를 다시 가져오는 기능을 하였는데, 메인 화면 렌더링 시 이미 GPS 정보를 불러오기 때문에 삭제하기로 결정
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 알림 아이콘의 경우 알림이 온 경우에만 알림 페이지로 이동할 수 있게 하였으나, 현재는 알림이 오지 않아도 알림페이지로 이동할 수 있도록 수정
</div>

<h4>사용 방법[ 1건 ]</h4>
<div>
</div>

## 🤔 향후 계획 및 개선 필요 사항

