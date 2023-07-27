import React from "react";
import styled from "tailwind-styled-components";

//@ts-ignore
export default function TestCard({ answer }) {
  return (
    <Testcard>
      <TestcardText>{answer}</TestcardText>
    </Testcard>
  );
}

const Testcard = styled.div`
w-80
py-9
px-4
mb-5
cursor-pointer
text-left
rounded-2xl
bg-white
hover:bg-violet-400
hover:text-white
hover:border-transparent
ease-in
duration-200
hover:-translate-y-1
active:translate-y-0
`;

const TestcardText = styled.p`
ml-2
`;
