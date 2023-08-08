# are-you-T : mbti 포털 서비스

## 프로젝트 주제

- 목적 : MBTI 기반 포털 서비스를 개발하여 사용자들이 자신의 성격 유형을 이해하고, 다른 유형의 사람들과 상호작용을 통해 이해할 수 있는 기회를 제공합니다.
- 목표
    - MBTI 포털 서비스를 개발하여 매력적인 캐릭터와 MBTI별 포인트 컬러 그리고 흥미로운 질문으로 재미있고 유익한 경험을 제공합니다  
    - 다양한 MBTI 유형의 개별 특성을 분석하고, 같은 유형의 사람들뿐만 아니라 다른 유형의 사람들의 생각도 알 수 있는 게시판(담벼락)을 제공합니다
    - 사용자들의 검사 결과에 기반한 MBTI 유형별 횟수 데이터를 수집하고, 이를 독창적으로 시각화하여 다른 MBTI 사이트와 차별화된 경험을 제공합니다

## 페르소나
![페르소나 (2)](https://github.com/are-you-T/client/assets/87935496/3adae08a-34ed-41ea-b7e2-ed64d4e1ba99)
<br />
💡차정언(24세): "나의 MBTI 유형에 대한 사람들의 생각이 궁금해!"

## 기능 구현 리스트

#### MBTI 유형별 분석, 통계, 담벼락 등 MBTI 포털 사이트의 핵심 기능을 구현합니다. 

<details><summary>1.공통 헤더,푸터 컴포넌트</summary>

![헤더](https://github.com/are-you-T/client/assets/87935496/54f36f44-67a9-490a-be68-4a663a8a76f2)
- 로고를 클릭하여 메인 페이지로 이동한다.
- 햄버거 버튼을 클릭하여 사이드 바를 표시한다.
- 하단의 깃허브 아이콘을 클릭하여 깃허브 페이지로 이동한다.
- 하단의 공유 아이콘을 클릭하여 화면의 링크를 복사한다.
  
</details>

<details><summary>2.사이드 바 컴포넌트</summary>

![사이드바](https://github.com/are-you-T/client/assets/87935496/51f9686d-5d2f-4a6d-acd3-24f28715e231)
- “테스트 하러가기” 버튼을 클릭하여 테스트 페이지로 이동한다.
- “통계 보러가기” 버튼을 클릭하여 통계 페이지로 이동한다.
- “담벼락 보러가기” 버튼을 클릭하여 담벼락 페이지로 이동한다.
- 하단의 링크를 클릭하여 깃허브 페이지로 이동한다.
  
</details>

<details><summary>3.메인 페이지</summary>

![메인](https://github.com/are-you-T/client/assets/87935496/67737a45-65f4-4dae-96d3-d122a2695867)
- 상단 햄버거 버튼을 누르면 사이드 바가 표시된다.
- 사이드 바 관련 기능은 1번 참고.
- 테스트 하러 가기 : 버튼을 클릭하면 MBTI 유형 검사 문답이 표시되고, 유저는 검사를 할 수 있다.
- 통계 보러 가기 : 전체 통계 페이지로 이동한다.
- 담벼락 보러 가기 : MBTI 전체 담벼락 페이지로 이동한다.
  
</details>

<details><summary>4.테스트 페이지</summary>

<img width="100" alt="테스트" src="https://github.com/are-you-T/client/assets/87935496/faf49015-323c-40e1-83e0-a46ec7c4cfbd">

- MBTI 유형 검사 페이지입니다.
- 16개 문항으로 이루어져 있으며, 1문항당 2개의 선택지가 있습니다.
- 선택지(TestCard)
- 프로그레스 바
  
</details>

<details><summary>5.테스트 결과 계산 로딩 컴포넌트</summary>

<img width="100" alt="테스트결과계산로딩" src="https://github.com/are-you-T/client/assets/87935496/3b093f05-12e2-4c0c-bfaa-f394ea704360">

- 테스트 페이지에서 사용자가 선택한 항목을 바탕으로 MBTI결과를 계산하는 페이지.
- 로딩 되는 동안 캐릭터의 색상과 상단 텍스트가 바뀐다.
- 4초 동안의 로딩이 끝나면 계산된 MBTI에 맞는 결과 페이지로 이동한다.
- 결과 페이지, 서버에 유저의 mbti 수치와 관련된 데이터를 전달한다.
  
</details>

<details><summary>6.테스트 결과 페이지</summary>

![테스트결과1](https://github.com/are-you-T/client/assets/87935496/6fbb03af-55cb-49e5-b634-a3564bd1a7f7)
![테스트결과2](https://github.com/are-you-T/client/assets/87935496/646604b9-7407-4e29-bbea-f9a521f74074)
- 사용자의 MBTI를 알려주고 해당 MBTI에 대한 정보를 보여주는  테스트 결과 페이지입니다.
- “결과 공유하기” 버튼을 통해 사용자의 특정 MBTI 유형 정보가 담긴 URL이 복사되어 해당 MBTI에 대한 테스트 결과 페이지를 공유할 수 있습니다.
- MBTI 유형마다 미리 지정해 놓은 캐릭터 컬러와 배경컬러가 매칭됩니다.
- “내 검사 결과”에서는 높은 비율의 유형을 왼쪽에 배치하면서 포인트 컬러를 주었고, 숫자형태의  데이터를 받아와서 progressbar로 조금 더 보기 쉽게 구현하였습니다.
- 사용자가 테스트를 모두 수행하여 테스트 결과 페이지로 이동한 경우 “내 검사 결과”가 포함되고, 결과 공유하기 버튼 기능을 통해 테스트 결과 페이지 URL로 들어온 경우 “내 검사 결과”가 포함되지 않게 처리했습니다.
- “다시하기” 버튼을 통해 테스트 첫 문항으로 이동할 수 있습니다.
- “통계 보러가기” 버튼을 통해 해당 MBTI에 대한 통계 페이지로 이동할 수 있습니다.
- “담벼락 보러가기” 버튼을 통해 해당 MBTI에 대한 담벼락 페이지로 이동할 수 있습니다.
  
</details>

<details><summary>7.담벼락(게시판) 글 작성 컴포넌트</summary>

![1 글작성](https://github.com/are-you-T/client/assets/87935496/5f8f6068-b123-4ba3-a865-2cf4a24299bd)
- <img width="50" alt="스크린샷 2023-08-08 오후 9 34 16" src="https://github.com/are-you-T/client/assets/87935496/a0df3314-fd71-4ede-b46b-0edc96e154b3">유형 카테고리:
MBTI 유형 카테고리를 수정할 수 있는 버튼이고 클릭 시 MBTI 유형을 선택하는 모달이 나타납니다.
-  <img width="50" alt="스크린샷 2023-08-08 오후 9 35 03" src="https://github.com/are-you-T/client/assets/87935496/735f1380-8ad1-4fed-b793-4b7057adee9f">닫기:
글 작성 모달을 닫을 수 있는 버튼입니다.
- 제목, 내용: 
제목과 내용을 입력할 수 있습니다.
- 배경 색상: 
담벼락 게시글의 배경색을 다른 색상으로 설정할 수 있는 버튼이고 클릭 시 지정된 배경 색상 중 하나를 체크할 수 있습니다.
- 작성 완료:
작성된 글을 담벼락에 게시할 수 있습니다.
  
</details>

<details><summary>8.MBTI 선택 모달</summary>

<img width="100" alt="2 MBTI선택" src="https://github.com/are-you-T/client/assets/87935496/ef7184a2-7a6e-4d61-8d47-b8c2b2aef757">

- 현재 선택되어 있는 MBTI 유형을 토글로 표시합니다.
- 원하는 MBTI 유형으로 클릭하여 담벼락에 게시할 MBTI 카테고리를 선택할 수 있습니다.
- 흐린 뒷배경을 클릭하여 화면을 벗어날 수 있습니다. (닫기 기능)
  
</details>

<details><summary>9.배경 색상 선택 모달</summary>

<img width="100" alt="3 배경색선택" src="https://github.com/are-you-T/client/assets/87935496/fe917ea5-e59c-461e-b685-d4ac25b710c6">

- 현재 선택되어 있는 배경 색상이 체크 표시되어있습니다. (기본 색상: 화이트)
- 원하는 색상을 클릭하여 담벼락에 보여줄 배경 색상을 변경할 수 있습니다.
- 흐린 뒷배경을 클릭하여 화면을 벗어날 수 있습니다. (닫기 기능)
  
</details>

<details><summary>10.유효성 검사 결과 모달</summary>

<img width="100" alt="유효성검사모달" src="https://github.com/are-you-T/client/assets/87935496/2e80f0a7-99cf-467d-b009-6c90f9f70b5d">
<img width="100" alt="유효성검사모달2" src="https://github.com/are-you-T/client/assets/87935496/43f72197-5df0-4907-9a8d-7daea1f030db">

- 제목이나 내용의 입력은 필수 값입니다.
- 제목이나 내용의 입력없이 작성완료 버튼을 클릭 시 나타납니다.
- 빈 값일 경우 입력을 요청하는 알림 모달창이 표시됩니다.
- 흐린 뒷배경을 클릭하여 화면을 벗어날 수 있습니다. (닫기 기능)
  
</details>

<details><summary>11.MBTI 전체 통계 페이지</summary>

![전체통계페이지1](https://github.com/are-you-T/client/assets/87935496/6bfca4c6-9fc9-4141-8f66-8393ea9eaa2d)
![노데이터](https://github.com/are-you-T/client/assets/87935496/d8dd4601-b448-4546-996c-d5f488deaba3)
- MBTI 테스트 결과를 기반으로 전체 통계를 보여주는 페이지 입니다.
- 통계를 올려보면 해당 수치도 파악이 가능합니다.
- “MBTI별 통계”를 클릭하면 MBTI 선택 모달이 나와 해당 통계 페이지로 이동합니다.
- “담벼랑 바로가기” 버튼을 클릭하면 담벼락 페이지로 이동합니다.
- 데이터가 없을때 해당 페이지로 보여지며 데이터 로딩중일때는 로딩 화면으로 전환됩니다.
  
</details>

<details><summary>12.MBTI 유형별 통계 페이지</summary>

![유형별통계](https://github.com/are-you-T/client/assets/87935496/b182026d-f82c-423d-b915-b493ad74b410)
![노데이터](https://github.com/are-you-T/client/assets/87935496/b35e1d00-97e4-40f1-a6d5-ee58609f6221)
- 특정 MBTI를 가진 사람들이 각 문항에 대해 어떤 답변을 선택했는지 보여주는 통계 페이지입니다.
- 오른쪽 상단의 버튼을 통해 다른 MBTI에 대한 답변 통계를 볼 수 있습니다.
- “MBTI 통계” 버튼을 통해 전체 통계 페이지로 이동할 수 있습니다.
- “담벼락 바로가기” 버튼을 통해 게시판으로 이동할 수 있습니다.
- 서버 오류 혹은 해당 MBTI의 통계 데이터가 없는 경우 등의 이유로 데이터가 존재하지 않을 때 조건부 렌더링이 되도록 처리하였습니다.
  
</details>



<br />

## 데모 사이트
 - [http://kdt-sw-5-team15.elicecoding.com/](https://client-are-you-t.vercel.app/)
 <div>

![로고](https://github.com/are-you-T/client/assets/87935496/80e136df-e092-4592-a06f-605e3a2a18ce)

 </div>


 ## Tech Stack
| FE | BE | Infra |
| ------ | ------ | ------ |
|  Tailwind CSS   |  node.js   |  Vercel   |
|  daisyUI   |   express.js   |  CloudType   |
|  React.js   |  mongodb   |     |
|  TypeScript   |     |     |
|  ApexCharts.js   |     |    |


 <br/>

 ### 데모 영상(임시)


<br />

## 👪 구성원 역할
<br />

| 이름 | 담당 업무 |  
| ------ | ------ |
|  원종석   |  API & 공통코드   |
|  예은선   |  MBTI 검사 결과 계산 로직   |
|  이슬   |   담벼락 글쓰기 컴포넌트   |
|  김진규   |   MBTI 검사 결과 화면   |
|  엄태호   |  MBTI 유형별 결과 통계 화면   |
|  이수민   |  MBTI 검사 화면   |
|  문수민   |  담벼락 화면  |
|  백민혁   |  MBTI 전체 유형 통계 화면   |


### 스키마 명세서(임시)
- 테스트 스키마
- 문항 스키마
- 게시글 스키마 (MBTI 별로 데이터 저장


<br />


## Collaboration Tools

- Notion : 스터디 기간, 사용 기술 스택, 참고 문서, 업무 진행 사항, 회의록 
- Discord : 음성 채팅방 활용 의견 제시및 문제 해결
- GitHub : Code Repository
- Postman Teams : API 테스트 진행



## 코드 컨벤션
- 변수 : 카멜 케이스(camelCase)
- 변수(스키마) : 파스칼 케이스(PascalCase)
- 함수 : 카멜 케이스(camelCase)
- 상수 : 대문자
- 파일 : 파스칼 케이스(PascalCase)
- 스타일 : 케밥 케이스(kebab-case)
  
  
## 커밋 컨벤션
- feat : 새로운 기능 추가
- fix : 오류 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, css 작업
- refactor : 코드 로직 수정 (리팩토링)
- docs : 문서 수정
- test : 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정 (module 추가 시)


## 브랜치 전략 (임시)
### main > develop > feature/A


## 트러블 슈팅 (임시)


## 실행 방법(임시)
```bash

```


### .env 설정(임시)
```

```
---

무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2023 엘리스 2차 스터디 [너T야?]팀. All rights reserved.
