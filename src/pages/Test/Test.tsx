import { useState, useEffect, useCallback } from "react";
import { Question, ResData, UserAnswer, MBTIData } from "@/@types/index";
import axiosRequest from "@/api/index";
import TestCard from "@/components/test/TestCard/TestCard";
import TestQuestion from "@/components/test/TestQuestion/TestQuestion";
import ProgressBar from "@/components/test/ProgressBar/ProgressBar";
import Loading from "@/components/test/loading/Loading";
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator";
import * as S from "./Test.styles";
import { useQuery } from "@tanstack/react-query";

export default function Test() {
  const [viewLoading, setViewLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [userResponse, setUserResponse] = useState<MBTIData[]>([]);
  const [currentChoiceList, setCurrentChoiceList] = useState<UserAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  const animationStart = () => {
    setAnimate((curr) => !curr);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["question", "basic"],
    queryFn: () =>
      axiosRequest.requestAxios<ResData<Question[]>>("get", "/question/basic"),
    select: ({ data }) => data,
    staleTime: 10 * 60 * 1000,
    retry: 3
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // 데이터가 로드되었을 때의 로직
      // ----------------------
      if (["E", "I"].includes(data[currentIndex]?.mbtiType)) {
        const questionArray = [
          {
            mbtiType: "E",
            text: data[currentIndex]?.answer.E
          },
          {
            mbtiType: "I",
            text: data[currentIndex]?.answer.I
          }
        ];

        shuffleArray(questionArray);
        setCurrentChoiceList(questionArray);
      } else if (["N", "S"].includes(data[currentIndex]?.mbtiType)) {
        const questionArray = [
          {
            mbtiType: "N",
            text: data[currentIndex]?.answer.N
          },
          {
            mbtiType: "S",
            text: data[currentIndex]?.answer.S
          }
        ];

        shuffleArray(questionArray);
        setCurrentChoiceList(questionArray);
      } else if (["T", "F"].includes(data[currentIndex]?.mbtiType)) {
        const questionArray = [
          {
            mbtiType: "T",
            text: data[currentIndex]?.answer.T
          },
          {
            mbtiType: "F",
            text: data[currentIndex]?.answer.F
          }
        ];

        shuffleArray(questionArray);
        setCurrentChoiceList(questionArray);
      } else {
        const questionArray = [
          {
            mbtiType: "J",
            text: data[currentIndex]?.answer.J
          },
          {
            mbtiType: "P",
            text: data[currentIndex]?.answer.P
          }
        ];

        shuffleArray(questionArray);
        setCurrentChoiceList(questionArray);
      }
      // ----------------------

      setQuestionList(data);
      animationStart();
    }
  }, [isLoading, isError, data, currentIndex]);

  // 테스트 문항 api 호출
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response: ResData<Question[]> = await axiosRequest.requestAxios<
  //         ResData<Question[]>
  //       >("get", "/question/basic");
  //       console.log(response.data);
  //       // setQuestionList(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  //   animationStart();
  // }, []);

  // 문항 선택지 클릭 시 발생 이벤트
  const handleClickCard = useCallback(
    (choiceIndex: number) => () => {
      if (currentChoiceList.length > 0 && questionList) {
        setCurrentIndex((curr) => {
          // const currentAnswer = questionList[curr];
          // delete currentAnswer.parent;

          const { idx, subject, answer, mbtiType, proportion } =
            questionList[curr];
          const currentAnswer = {
            idx,
            subject,
            answer,
            mbtiType,
            proportion
            // text,
          };

          setUserResponse((prevResponse) => {
            const updatedResponse = {
              ...currentAnswer,
              selected: currentChoiceList[choiceIndex].mbtiType
            } as unknown as MBTIData; // 형식 변환
            return [...prevResponse, updatedResponse];
          });
          if (curr === questionList.length - 1) {
            setViewLoading(true);
            return curr;
          }
          return curr + 1;
        });
      }
    },
    [currentChoiceList, questionList]
  );

  // 문항 답변 위치 랜덤 배치
  const shuffleArray = (array: object[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // 요소를 교환합니다.
    }
  };

  // 각 문항에 대한 선택지 표시
  // useEffect(() => {
  //   if (questionList.length) {
  //     if (["E", "I"].includes(questionList[currentIndex].mbtiType)) {
  //       const questionArray = [
  //         {
  //           mbtiType: "E",
  //           text: questionList[currentIndex].answer.E
  //         },
  //         {
  //           mbtiType: "I",
  //           text: questionList[currentIndex].answer.I
  //         }
  //       ];

  //       shuffleArray(questionArray);
  //       setCurrentChoiceList(questionArray);
  //     } else if (["N", "S"].includes(questionList[currentIndex].mbtiType)) {
  //       const questionArray = [
  //         {
  //           mbtiType: "N",
  //           text: questionList[currentIndex].answer.N
  //         },
  //         {
  //           mbtiType: "S",
  //           text: questionList[currentIndex].answer.S
  //         }
  //       ];

  //       shuffleArray(questionArray);
  //       setCurrentChoiceList(questionArray);
  //     } else if (["T", "F"].includes(questionList[currentIndex].mbtiType)) {
  //       const questionArray = [
  //         {
  //           mbtiType: "T",
  //           text: questionList[currentIndex].answer.T
  //         },
  //         {
  //           mbtiType: "F",
  //           text: questionList[currentIndex].answer.F
  //         }
  //       ];

  //       shuffleArray(questionArray);
  //       setCurrentChoiceList(questionArray);
  //     } else {
  //       const questionArray = [
  //         {
  //           mbtiType: "J",
  //           text: questionList[currentIndex].answer.J
  //         },
  //         {
  //           mbtiType: "P",
  //           text: questionList[currentIndex].answer.P
  //         }
  //       ];

  //       shuffleArray(questionArray);
  //       setCurrentChoiceList(questionArray);
  //     }
  //   }
  // }, [currentIndex, questionList]);

  // 테스트 페이지 UI
  if (currentChoiceList.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <S.TestPage>
      <TestQuestion
        idx={String(currentIndex + 1).padStart(2, "0")}
        subject={questionList[currentIndex].subject}
        animate={animate}
        animationStart={animationStart}
      />
      <TestCard
        onClick={handleClickCard}
        index={0}
        answer={currentChoiceList[0].text}
        animate={animate}
        animationStart={animationStart}
      />
      <TestCard
        onClick={handleClickCard}
        index={1}
        answer={currentChoiceList[1].text}
        animate={animate}
        animationStart={animationStart}
      />
      <ProgressBar progressNum={currentIndex + 1} />
      <Loading
        visible={viewLoading}
        userResponse={{ parent: "basic", mbtiData: userResponse }}
      />
    </S.TestPage>
  );
}
