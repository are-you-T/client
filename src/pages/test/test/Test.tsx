import { useState, useEffect, useCallback } from "react";
import { Question, ResData, UserAnswer, MBTIData } from "@/@types/index";
import axiosRequest from "@/api/index";
import TestCard from "@/components/test/TestCard/TestCard";
import TestQuestion from "@/components/test/TestQuestion/TestQuestion";
import ProgressBar from "@/components/test/ProgressBar/ProgressBar";
import Loading from "@/components/test/loading/Loading";
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator";
import * as S from "./Test.styles";

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

  // 테스트 문항 api 호출
  useEffect(() => {
    async function fetchData() {
      try {
        const response: ResData<Question[]> = await axiosRequest.requestAxios<
          ResData<Question[]>
        >("get", "/question/basic");
        setQuestionList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    animationStart();
  }, []);

  // 문항 선택지 클릭 시 발생 이벤트
  const handleClickCard = useCallback(
    (choiceIndex: number) => () => {
      if (currentChoiceList.length > 0 && questionList.length > 0) {
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

  // 각 문항에 대한 선택지 표시
  useEffect(() => {
    if (questionList.length) {
      if (currentIndex <= 3) {
        setCurrentChoiceList([
          {
            mbtiType: "E",
            text: questionList[currentIndex].answer.E
          },
          {
            mbtiType: "I",
            text: questionList[currentIndex].answer.I
          }
        ]);
      } else if (currentIndex <= 7) {
        setCurrentChoiceList([
          {
            mbtiType: "N",
            text: questionList[currentIndex].answer.N
          },
          {
            mbtiType: "S",
            text: questionList[currentIndex].answer.S
          }
        ]);
      } else if (currentIndex <= 11) {
        setCurrentChoiceList([
          {
            mbtiType: "T",
            text: questionList[currentIndex].answer.T
          },
          {
            mbtiType: "F",
            text: questionList[currentIndex].answer.F
          }
        ]);
      } else {
        setCurrentChoiceList([
          {
            mbtiType: "J",
            text: questionList[currentIndex].answer.J
          },
          {
            mbtiType: "P",
            text: questionList[currentIndex].answer.P
          }
        ]);
      }
    }
  }, [currentIndex, questionList]);

  // 테스트 페이지 UI
  if (questionList.length === 0 || currentChoiceList.length === 0) {
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
