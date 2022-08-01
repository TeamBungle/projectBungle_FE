
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

- BE Trouble Shooting
    

- FE Trouble Shooting
    <details>
    <summary>사용자 로그인 보안 강화</summary>
    <pre>
    1. 문제 인지
      모임을 주최하는 서비스인만큼, 사용자 정보의 보안이 강화되야 한다고 판단
      기존의 Access token 방식으로는 손쉽게 사용자 정보가 탈취될 수 있음
    2. 선택지
      Refresh Token을 통해 보안을 강화
      Cookie의 Options( secure 등 )을 통해 보안을 강화할 수 있다고 판단하여 Refresh Token은 Cookie에 저장
      Access Token은 localStorage에 저장하되, 만료 기간( 30분 )을 체크하여 interceptor로 request 요청 전,
      만료 여부를 검증
    </pre>
    <h5>Axios interceptor 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/customapi/Refresh.js#L1-L64
    <h5>Axios create 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/customapi/CustomAxios.js#L1-L10
    </details>
    
    <details>
    <summary>비인가 사용자 URL 막기</summary>
    <pre>
    1. 문제 인지
      로그인 하지 않는 사용자가 URL을 직접 입력해서 다른 페이지로 접근할 수 있는 상황이 발생
    2. 선택지
      로그인 여부를 판별할 수 있는 로직 검토 필요
    3. 해결 방법
      - localStorage에 access_token이 있는지를 확인하여, 사용자의 로그인 여부를 판별
      - Private Route를 만들어 로그인 했을 때 보여줄 페이지만 감싸주고 나머지는 로그인 화면으로 
        Redirection 할 수 있도록 함
    </pre>
    <h5>Private Route 설정</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/c6a7252dbd2c1ca3d01e6b1fdcebfce3c207044d/src/utils/PrivateRoutes.js#L1-L9
    <h5>Private Route로 App.js의 Route 감싸기</h5>
    https://github.com/TeamBungle/projectBungle_FE/blob/00460f7436e216b8d65729aae642864c7185c9ab/src/App.js#L42-L74
    </details>

    <details>
        <summary>채팅 Client 문제</summary>
    </details>    
    <details>
    <summary>크로스 브라우징 Enter Key 문제</summary>
    <pre>
    1. 문제 인지
      기존 PC 개발 환경에서 enter key로 input 입력처리를 하였는데, 모바일 브라우저( Andorid )에서는 
    enter key 입력이 먹지 않음
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
| BE | 정현욱님 |  |
| FE | 최서우님 | https://github.com/zerovodka |
| FE | 한결님 | https://github.com/GHan19 |
| FE( L ) | 한지용님 | https://github.com/jigomgom |
| Designer | 양승연님 |  |
