import { useState, useEffect, useCallback } from "react";
import TestCard from "@/components/test/TestCard";
import TestQuestion from "@/components/test/TestQuestion";
import ProgressBar from "@/components/test/ProgressBar";
import Loading from "@/components/test/Loading";
import tw from "tailwind-styled-components";
// import { BsChevronRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
//@ts-ignore
export default function Test() {
  const [viewLoading, setViewLoading] = useState(false);

  const handleClickCard = () => {
    setViewLoading(true);
  };

  return (
    <TestPage>
      <TestQuestion
        idx="01."
        subject="친구와 1시간이 넘는 통화를 마친 뒤 당신의 상태는?"
      />

      <TestCard onClick={handleClickCard} answer="남은 얘기는 만나서 해야징" />
      <TestCard
        onClick={handleClickCard}
        answer="통화가 끝났으니 이제 쉬어야지.."
      />
      <ProgressBar />
      <Loading visible={viewLoading} />
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
