import React from "react";
import styled from "tailwind-styled-components";
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

const Container = styled.div`
mt-20
`;

const ProgressNum = styled.p`
text-lg
text-violet-400
text-right
font-medium
`;

const Progress = styled.div`
progress
w-[320px]
h-3
mt-2
mb-5
bg-white
`;

const Status = styled.div`
progress
w-[32px]
h-full
bg-purple-300
`;
