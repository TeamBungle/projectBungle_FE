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
    

- FE Trouble Shooting
    

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
