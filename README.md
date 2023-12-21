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
💡차언정(24세): "나의 MBTI 유형에 대한 사람들의 생각이 궁금해!"

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

- 사용자의 MBTI를 알려주고 해당 MBTI에 대한 정보를 보여주는 테스트 결과 페이지입니다.
- “결과 공유하기” 버튼을 통해 사용자의 특정 MBTI 유형 정보가 담긴 URL이 복사되어 해당 MBTI에 대한 테스트 결과 페이지를 공유할 수 있습니다.
- MBTI 유형마다 미리 지정해 놓은 캐릭터 컬러와 배경컬러가 매칭됩니다.
- “내 검사 결과”에서는 높은 비율의 유형을 왼쪽에 배치하면서 포인트 컬러를 주었고, 숫자형태의 데이터를 받아와서 progressbar로 조금 더 보기 쉽게 구현하였습니다.
- 사용자가 테스트를 모두 수행하여 테스트 결과 페이지로 이동한 경우 “내 검사 결과”가 포함되고, 결과 공유하기 버튼 기능을 통해 테스트 결과 페이지 URL로 들어온 경우 “내 검사 결과”가 포함되지 않게 처리했습니다.
- “다시하기” 버튼을 통해 테스트 첫 문항으로 이동할 수 있습니다.
- “통계 보러가기” 버튼을 통해 해당 MBTI에 대한 통계 페이지로 이동할 수 있습니다.
- “담벼락 보러가기” 버튼을 통해 해당 MBTI에 대한 담벼락 페이지로 이동할 수 있습니다.

</details>

<details><summary>7.담벼락(게시판) 글 작성 컴포넌트</summary>

![1 글작성](https://github.com/are-you-T/client/assets/87935496/5f8f6068-b123-4ba3-a865-2cf4a24299bd)

- <img width="50" alt="스크린샷 2023-08-08 오후 9 34 16" src="https://github.com/are-you-T/client/assets/87935496/a0df3314-fd71-4ede-b46b-0edc96e154b3">유형 카테고리:
  MBTI 유형 카테고리를 수정할 수 있는 버튼이고 클릭 시 MBTI 유형을 선택하는 모달이 나타납니다.
- <img width="50" alt="스크린샷 2023-08-08 오후 9 35 03" src="https://github.com/are-you-T/client/assets/87935496/735f1380-8ad1-4fed-b793-4b7057adee9f">닫기:
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

- [https://are-you-t.vercel.app/](https://are-you-t.vercel.app/)
<div>

![로고](https://github.com/are-you-T/client/assets/87935496/80e136df-e092-4592-a06f-605e3a2a18ce)

 </div>

## Tech Stack

| FE                        | BE         | Infra     |
| ------------------------- | ---------- | --------- |
| Tailwind CSS              | node.js    | Vercel    |
| daisyUI                   | express.js | CloudType |
| React.js                  | mongodb    |           |
| Tailwind-styled-component |            |           |
| TypeScript                |            |           |
| ApexCharts.js             |            |           |


<br />

## 👪 구성원 역할

<br />

| 담당자 | 업무                            | 비고                                                                                                                                        |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 원종석 | API 개발 </br>공통 코드 개발    | 필요한 API 개발 </br>스키마 및 데이터 타입 정의 </br>API 호출 공통 함수 개발                                                                |
| 예은선 | MBTI 검사 결과 계산 로직 개발   | 사용자가 선택한 데이터 계산 </br>검사 결과 데이터 전달 </br>통계 데이터 갱신                                                                |
| 이슬   | 담벼락 글쓰기 컴포넌트 개발     | 사용자가 글을 작성할 수 있는 폼 모달 창 개발 </br>제목, 내용 유효성 검사 </br>MBTI 유형 상태 관리 </br>담벼락 스티커 색상 선택 모달 창 개발 |
| 김진규 | MBTI 검사 결과 화면 개발        | 검사 결과 데이터 화면에 표시 </br>링크 공유하기 </br>유형별 통계 표시(외부 링크로 접근시에는 보이지 않음)                                   |
| 엄태호 | MBTI 유형별 결과 통계 화면 개발 | 유형별 결과 통계 차트로 표시 </br>문항당 하나의 차트 및 응답을 표시                                                                         |
| 이수민 | MBTI 검사 화면 개발             | 테스트 검사 데이터 스케일링 및 전달                                                                                                         |
| 문수민 | 담벼락 화면 개발                | 전체 유형의 글을 화면에 표시 </br>유형별 담벼락 페이지에서는 해당 유형의 글만 화면에 표시 </br>실시간 좋아요 처리                           |
| 백민혁 | MBTI 전체 유형 통계 화면 개발   | 검사 결과에 대한 MBTI 유형별 횟수를 통계로 표시                                                                                             |

<br />

## 스키마 명세서

<details><summary>테스트 스키마</summary>

```
  // 어떤 테스트인지? 사실 테스트는 1개만 만들 것이지만, 나중에 확장성을 위해 만든다.
const TestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});
```

</details>

<details><summary>문항 스키마</summary>

```
// 어떤 테스트에 대한 문항인지. 사실 테스트는 1개만 만들 것이지만, 
// 나중에 확장성을 위해 이렇게 정의한다.
const QuestionSchema = new Schema({
  // 문항 번호
  idx: {
    type: Number,
    required: true,
  },
  // 문항 질문(주제)
  subject: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  answer: {
		type: {
      E: { type: String, required: false },
      I: { type: String, required: false },
      N: { type: String, required: false },
      S: { type: String, required: false },
      T: { type: String, required: false },
      F: { type: String, required: false },
      J: { type: String, required: false },
      P: { type: String, required: false },
    },
    required: true,
  }
  // 어떤 mbti 판별에 대한 문항인지의 타입
  // E, I, N, S, F, T, P, J
  mbtiType: {
    type: String,
    required: true,
  },
  // mbtiType에 대한 답변
  typeAnswer: {
	  type: String,
    required: true
  },
  // 중요도
  proportion: {
		type: Number,
    required: true
  }
});
```

</details>

<details><summary>게시글 스키마 (MBTI 별로 데이터 저장)</summary>

```
const BoardSchema = new Schema({
    // 사용자 uuid (일단 보류.)
    uuid: {
      type: String,
      required: false,
    },
    // mbti 카테고리 (16개의 mbti)
    category: {
      type: String,
      required: true,
    },
    // 게시글 제목
    title: {
      type: String,
      required: true
    },
    // 게시글 내용
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // 공감
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'boards',
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) },
  }
});
```

</details>

<details><summary>통계 스키마 (MBTI 결과에 대해 선택 결과 저장)</summary>

```
const StatisticSchema = new Schema({
  // 특정 mbti 유형
  mbtiType: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  totalResponse: {
    type: Number,
    required: true,
    default: 0,
  },
  mbtiData: [
    {
      idx: {
        type: Number,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      answer: {
        E: { type: String, required: false },
        I: { type: String, required: false },
        N: { type: String, required: false },
        S: { type: String, required: false },
        T: { type: String, required: false },
        F: { type: String, required: false },
        J: { type: String, required: false },
        P: { type: String, required: false },
      },
      selection: {
        E: { type: Number, required: false },
        I: { type: Number, required: false },
        N: { type: Number, required: false },
        S: { type: Number, required: false },
        T: { type: Number, required: false },
        F: { type: Number, required: false },
        J: { type: Number, required: false },
        P: { type: Number, required: false },
      },
    },
  ],
});
```

</details>

<details><summary>MBTI 스키마 (16개 MBTI에 대한 설명, 잘 맞는 MBTI 안 맞는 MBTI)</summary>

```
const MBTISchema = new Schema({
	//
  // 16개 mbti 통계 데이터
  name: {
		  type: String,
      required: true
  },
  // 전체 mbti 비율 통계를 위한 데이터
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  // 해당 mbti에 대한 특징 요약
  summary: {
    type: String,
    required: true,
  },
  // 해당 mbti에 대한 키워드
  tag: {
		type: Array,
    required: true
  },
	content: {
     // 해당 mbti에 대한 설명
     description: {
		     type: String,
         required: true
     }
     // 잘 맞는 mbti
	   good: {
       // 잘 맞는 mbti 유형 1개
		   name: {
					type: String,
          required: true
	     },
       // 이에 대한 설명 (왜 잘맞나요?)
	     description: {
			    type: String,
          required: true
	     }
	  },
	  bad : {
      // 잘 안맞는 mbti 유형 1개
			name: {
				type: String,
        required: true
	    },
      // 이에 대한 설명 (왜 잘 안맞나요?)
	    description: {
				type: String,
        required: true
	    }
	  },
	},
});
```

</details>

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

## 브랜치 전략

### main - develop - feature/A


---

무단 사용 및 도용, 복제 및 배포를 금합니다.
<br />
Copyright 2023 엘리스 2차 스터디 [너T야?]팀. All rights reserved.
