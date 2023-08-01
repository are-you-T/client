import { useState, useEffect, useCallback } from "react";
import TestCard from "@/components/test/TestCard";
import TestQuestion from "@/components/test/TestQuestion";
import ProgressBar from "@/components/test/ProgressBar";
import Loading from "@/components/test/Loading";
import tw from "tailwind-styled-components";
import axios from "axios";
// import { BsChevronRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
//@ts-ignore
export default function Test() {
  const [viewLoading, setViewLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState<any[] | any>();
  const [questionNum, setQuestionNum] = useState(0);

  const URL = "http://localhost:3001/api/v1/question/basic";

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await axios.get(URL);
        // console.log('Response:', response.data);
        setCurrentQ(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getQuestion();
  }, []);

  const handleClickCard = () => {
    // setViewLoading(true);
    setQuestionNum((curr) => curr + 1);
  };

  // useEffect(()=>{console.log(currentQ)},[currentQ])
  const createAnswerType = (idx: number): any[] => {
    switch (true) {
      case idx >= 0 && idx <= 3:
        return [currentQ[idx].answer.E, currentQ[idx].answer.I];
      case idx >= 4 && idx <= 7:
        return [currentQ[idx].answer.N, currentQ[idx].answer.S];
      case idx >= 8 && idx <= 11:
        return [currentQ[idx].answer.T, currentQ[idx].answer.F];
      case idx >= 12 && idx <= 15:
        return [currentQ[idx].answer.J, currentQ[idx].answer.P];
      default:
        return [];
    }
  };

  return (
    currentQ && (
      <TestPage>
        <TestQuestion
          idx={String(currentQ[questionNum].idx).padStart(2, "0")}
          subject={currentQ[questionNum].subject}
        />

        <TestCard
          onClick={handleClickCard}
          //@ts-ignore
          answer={createAnswerType(questionNum)[0]}
        />
        <TestCard
          onClick={handleClickCard}
          //@ts-ignore
          answer={createAnswerType(questionNum)[1]}
        />
        <ProgressBar />
        <Loading visible={viewLoading} />
      </TestPage>
    )
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
