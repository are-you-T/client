import React from "react";
import tw from "tailwind-styled-components";
import { questionText } from "@/interfaces/index";

export default function TestQuestion({ idx, subject, animate }: questionText) {
  return (
    <QuestionDiv>
      <QuestionNum>{idx}</QuestionNum>
      <QuestionText>{subject}</QuestionText>
    </QuestionDiv>
  );
}

const QuestionDiv = tw.div`
mb-9
h-[190px]

select-none
relative
animate-testComponent
`;

const QuestionNum = tw.h2`
text-center
text-3xl
font-black
text-violet-400
mb-3
mt-10
`;

const QuestionText = tw.h3`
text-center 
w-80 
text-xl 
font-semibold 
text-slate-50 
mb-11
`;
