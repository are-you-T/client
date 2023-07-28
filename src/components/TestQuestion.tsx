import React from "react";
import tw from "tailwind-styled-components";
//@ts-ignore
export default function TestQuestion({ idx, subject }) {
  return (
    <QuestionDiv>
      <QuestionNum>{idx}</QuestionNum>
      <QuestionText>{subject}</QuestionText>
    </QuestionDiv>
  );
}

const QuestionDiv = tw.div`
mb-9
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
