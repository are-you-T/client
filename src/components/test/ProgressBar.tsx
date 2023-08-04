import styled from "styled-components";
import tw from "tailwind-styled-components";

//@ts-ignore
export default function ProgressBar({ progressNum }) {
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

// props 받아서 bar 기능 적용하기
// const Status = tw.div`
// progress
// w-[26px]
// h-full
// bg-purple-300
// `;

const Status = styled.div<{ $progressNum: number }>`
  width: ${({ $progressNum }) => `${$progressNum * 20}px`};
  height: 100%;
  border-radius: 15px;
  background-color: #b2acf9;
  transition: width 0.25s ease-in-out;
`;
