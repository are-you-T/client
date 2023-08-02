import React from "react";
import tw from "tailwind-styled-components";
//@ts-ignore
export default function TestCard({ answer, index, onClick }) {
  const onClickCard = onClick(index);
  return (
    <Testcard onClick={onClickCard}>
      <TestcardText>{answer}</TestcardText>
    </Testcard>
  );
}

const Testcard = tw.button`
w-80
h-[120px]
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

const TestcardText = tw.p`
ml-2
`;
