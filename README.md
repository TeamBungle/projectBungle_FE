
![배너용](https://user-images.githubusercontent.com/107230384/182052615-f4743530-6596-4b4f-9b5e-6100f021eebb.jpg)

**싱글벙글, 사용자 현재 위치 기반으로 빠르게 주변 모임을 확인할 수 있습니다.**

### 🤔 프로젝트 시장 조사 및 Feasibility Test

[Feasibility test](https://www.notion.so/Feasibility-test-b8f7d2dccd354a0db0577e245a12f4a4) 

### 🙂 아키텍쳐

![최종 아키텍처](https://user-images.githubusercontent.com/107230384/182052947-7c29f084-224a-492b-9a71-0c0f09c65a9e.jpg)



### 🤩 벙글 주요 기능

1. GPS를 사용한 현재 위치 확인 ( geolocation )
    - 사용자 위치 기준, 400km 반경의 실시간 벙글 위치와 마감 임박순 벙글 을 나타냄
    - 서비스 론칭 기간이 짧기 때문에 400km로 결정, 추후 데이터가 많이 쌓이면 50km로 변경 예정
    
![Untitled (1)](https://user-images.githubusercontent.com/107230384/182052513-562cce1e-09d0-4496-aceb-e17440cf3b22.png)
    

2. 실시간 벙글 생성 및 문자 채팅 ( Redis, StompJS, SockJS )
    - 벙글 생성을 통해 주변 사람들과 모임을 가질 수 있고 문자 채팅에서 상세 결정을 내릴 수 있음
    - 사용자 피드백에 따라 화상 채팅 추가 예정

![Untitled (2)](https://user-images.githubusercontent.com/107230384/182052538-9e3d28f1-0f7f-4604-a944-35c920fa2aca.png)


3. 지도를 통해 실시간 진행 중인 벙글 확인 ( Redis, Kakao map API )

![Untitled (3)](https://user-images.githubusercontent.com/107230384/182052556-d5fb2af0-7617-403a-9e39-a3becd215dd3.png)


### 🧐 Trouble Shooting

- <a href="https://github.com/TeamBungle/projectBungle_BE/">BE Trouble Shooting </a>
    

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
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/customapi/Refresh.js#L1-L64
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
    https://github.com/TeamBungle/projectBungle_FE/blob/00460f7436e216b8d65729aae642864c7185c9ab/src/App.js#L42-L74
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
    <h5>PK send로 대체</h5>    https://github.com/TeamBungle/projectBungle_FE/blob/dad9dd32e40bd9d1aadf40ecda3d2c0325d46ea1/src/pages/ChattingRoom.js#L208-L209
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
    https://github.com/TeamBungle/projectBungle_FE/blob/dad9dd32e40bd9d1aadf40ecda3d2c0325d46ea1/src/pages/ChattingRoom.js#L350-L366
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
    https://github.com/TeamBungle/projectBungle_FE/blob/a26e741aab0d49111168fcf5e3afa5ea01984253/src/redux/modules/BungleSlice.js#L563-L568
    <h5>게시글 삭제시, extraReducer를 활용하여 disconnect</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/a26e741aab0d49111168fcf5e3afa5ea01984253/src/redux/modules/BungleSlice.js#L94-L124
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
    https://github.com/TeamBungle/projectBungle_FE/blob/dad9dd32e40bd9d1aadf40ecda3d2c0325d46ea1/src/pages/Map.js#L166-L171
    <h5>렌더링 시 전체 리스트, 태그 검색 리스트 적용 </h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/dad9dd32e40bd9d1aadf40ecda3d2c0325d46ea1/src/pages/Map.js#L209-L243
    <h5>상세 정보 검색 리스트 적용</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/dad9dd32e40bd9d1aadf40ecda3d2c0325d46ea1/src/pages/Map.js#L295-L310
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
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/pages/Login.js#L295-L317
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
| BE | 정현욱님 | https://github.com/Jeonghyeonuk |
| FE | 최서우님 | https://github.com/zerovodka |
| FE | 한결님 | https://github.com/GHan19 |
| FE( L ) | 한지용님 | https://github.com/jigomgom |
| Designer | 양승연님 | didtmddus123@gmail.com |

![image](https://user-images.githubusercontent.com/107230384/182984029-9de38ffc-186e-415c-a372-76b2bf59a6dd.png)
