import React from "react";
import TypePercentageBar from "./TypePercentageBar";
import tw from "tailwind-styled-components";

export default function TypePercentageBars() {
  return (
    <Container>
      <Title>내 검사 결과</Title>
      <TypePercentageBar
        title="에너지"
        type1="내향형(I)"
        type2="외향형(E)"
        percent1={60}
        percent2={40}
        bar="w-3/5"
        textColor="text-red-500"
        barColor="bg-red-500"
      />
      <TypePercentageBar
        title="인식"
        type1="직관형(N)"
        type2="감각형(S)"
        percent1={80}
        percent2={20}
        bar="w-4/5"
        textColor="text-orange-500"
        barColor="bg-orange-500"
      />
      <TypePercentageBar
        title="본성"
        type1="사고형(T)"
        type2="감정형(F)"
        percent1={60}
        percent2={40}
        bar="w-3/5"
        textColor="text-green-500"
        barColor="bg-green-500"
      />
      <TypePercentageBar
        title="전술"
        type1="계획형(J)"
        type2="탐색형(P)"
        percent1={100}
        percent2={0}
        bar="w-5/5"
        textColor="text-purple-500"
        barColor="bg-purple-500"
      />
    </Container>
  );
}
const Container = tw.div`
w-full
bg-white
rounded-xl
px-2
pb-4
`;
const Title = tw.div`
font-bold
text-3xl
text-black
text-center
py-6
`;
