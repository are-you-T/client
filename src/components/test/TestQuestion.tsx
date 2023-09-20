import tw from "tailwind-styled-components";
import { QuestionText } from "@/@types/index";

export default function TestQuestion({ idx, subject, animate }: QuestionText) {
  return (
    <QuestionDiv>
      <QuestionNum>{idx}</QuestionNum>
      <QuestionHeaderText>{subject}</QuestionHeaderText>
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

const QuestionHeaderText = tw.h3`
text-center 
w-80 
text-xl 
font-semibold 
text-slate-50 
mb-11
`;
