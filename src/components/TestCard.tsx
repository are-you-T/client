import React from "react";
import tw from "tailwind-styled-components";

//@ts-ignore
export default function TestCard({ contents }) {
  return (
    <Testcard>
      <TestcardText>{contents}</TestcardText>
    </Testcard>
  );
}

const Testcard = tw.div`;
w-80
py-9 
px-4 
mb-5 
cursor-pointer 
text-left 
rounded-2xl 
bg-white
`;

const TestcardText = tw.p`
ml-2
`;
