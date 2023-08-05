import styled from "styled-components";
import tw from "tailwind-styled-components";

export default function ProgressBar({ progressNum }: { progressNum: number }) {
  const TOTAL_SLIDES = 16;

  return (
    <Container>
      <ProgressNum>
        {progressNum}/{TOTAL_SLIDES}
      </ProgressNum>
      <Progress>
        <Status $progressNum={progressNum} />
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

const Status = styled.div<{ $progressNum: number }>`
  width: ${({ $progressNum }) => `${$progressNum * 20}px`};
  height: 100%;
  border-radius: 15px;
  background-color: #b2acf9;
  transition: width 0.25s ease-in-out;
`;
