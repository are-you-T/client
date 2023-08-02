import { useState, useEffect, useCallback } from "react";
import TestCard from "@/components/test/TestCard";
import TestQuestion from "@/components/test/TestQuestion";
import ProgressBar from "@/components/test/ProgressBar";
import Loading from "@/components/test/Loading";
import tw from "tailwind-styled-components";
import axios from "axios";
// import { BsChevronRight } from "react-icons/bs";
// import { Link } from "react-router-dom";

// 타입 정의
type CurrentChoiceList = {
  mbtiType: string;
  text: string;
};

export default function Test() {
  const [viewLoading, setViewLoading] = useState(false);
  const [questionList, setQuestionList] = useState<any[] | any>([]);
  const [userResponse, setUserResponse] = useState<any[]>([]);
  const [currentChoiceList, setCurrentChoiceList] = useState<
    CurrentChoiceList[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const URL = "http://localhost:3001/api/v1/question/basic";

  // 테스트 문항 api 호출
  useEffect(() => {
    const getQuestionList = async () => {
      try {
        const response = await axios.get(URL);
        // console.log("Response:", response.data);
        setQuestionList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getQuestionList();
  }, []);

  const handleClickCard = useCallback(
    (choiceIndex: number) => () => {
      if (currentChoiceList.length > 0 && questionList.length > 0) {
        setCurrentIndex((curr) => {
          const currentAnswer = questionList[curr];
          setUserResponse((prevResponse) => [
            ...prevResponse,
            {
              ...currentAnswer,
              selection: currentChoiceList[choiceIndex].mbtiType,
            },
          ]);
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
  console.log(userResponse);

  // 각 문항에 대한 선택지 표시
  useEffect(() => {
    if (questionList.length) {
      // console.log(questionList[currentIndex].answer);
      if (currentIndex <= 3) {
        setCurrentChoiceList([
          {
            mbtiType: "E",
            text: questionList[currentIndex].answer.E,
          },
          {
            mbtiType: "I",
            text: questionList[currentIndex].answer.I,
          },
        ]);
      } else if (currentIndex <= 7) {
        setCurrentChoiceList([
          {
            mbtiType: "N",
            text: questionList[currentIndex].answer.N,
          },
          {
            mbtiType: "S",
            text: questionList[currentIndex].answer.S,
          },
        ]);
      } else if (currentIndex <= 11) {
        setCurrentChoiceList([
          {
            mbtiType: "T",
            text: questionList[currentIndex].answer.T,
          },
          {
            mbtiType: "F",
            text: questionList[currentIndex].answer.F,
          },
        ]);
      } else {
        setCurrentChoiceList([
          {
            mbtiType: "J",
            text: questionList[currentIndex].answer.J,
          },
          {
            mbtiType: "P",
            text: questionList[currentIndex].answer.P,
          },
        ]);
      }
    }
  }, [currentIndex, questionList]);

  // 마지막 문항 선택 완료 시 로딩 컴포넌트 불러오기

  // 테스트 페이지 UI
  if (questionList.length === 0 || currentChoiceList.length === 0) {
    return null;
  }
  // console.log(currentChoiceList);
  return (
    <TestPage>
      <TestQuestion
        idx={String(currentIndex + 1).padStart(2, "0")}
        subject={questionList[currentIndex].subject}
      />
      <TestCard
        onClick={handleClickCard}
        //@ts-ignore
        index={0}
        answer={currentChoiceList[0].text}
      />
      <TestCard
        onClick={handleClickCard}
        //@ts-ignore
        index={1}
        answer={currentChoiceList[1].text}
      />
      <ProgressBar progressNum={currentIndex + 1} />
      <Loading visible={viewLoading} userData={userResponse} />
      <Loading visible={viewLoading} userData={userResponse} />
    </TestPage>
  );
}

const TestPage = tw.section`
flex 
flex-col 
items-center
justify-center
w-[390px] 
h-[790.96px] 
mx-auto 
my-0 
bg-black
`;
