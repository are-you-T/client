import tw, { styled } from "twin.macro";

export const Container = tw.div`
mt-20
`;

export const ProgressNum = tw.p`
text-lg
text-violet-400
text-right
font-medium
`;

export const Progress = tw.div`
progress
w-[320px]
h-3
mt-2
mb-5
bg-white
`;

export const Status = styled.div<{ $progressNum: number }>`
  width: ${({ $progressNum }) => `${$progressNum * 20}px`};
  height: 100%;
  border-radius: 15px;
  background-color: #b2acf9;
  transition: width 0.25s ease-in-out;
`;
