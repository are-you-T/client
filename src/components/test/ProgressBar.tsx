import React from "react";
import tw from "tailwind-styled-components";
//@ts-ignore
export default function ProgressBar() {
  return (
    <Container>
      <ProgressNum>1/10</ProgressNum>
      <Progress>
        <Status></Status>
      </Progress>
    </Container>
  );
}

const Container = tw.div`
mt-20
`;

const ProgressNum = tw.p`
text-lg
text-violet-400
text-right
font-medium
`;

const Progress = tw.div`
progress
w-[320px]
h-3
mt-2
mb-5
bg-white
`;

const Status = tw.div`
progress
w-[32px]
h-full
bg-purple-300
`;
