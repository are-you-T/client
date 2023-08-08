import tw from "tailwind-styled-components";
import { testCardProps } from "@/interfaces/index";

const TestCard = ({
  answer,
  index,
  onClick,
  animate,
  animationStart,
}: testCardProps) => {
  const onClickCard = onClick(index);
  return (
    <Testcard
      onClick={() => {
        onClickCard();
        animationStart();
      }}
      key={animate.toString()}
    >
      <TestcardText>{answer}</TestcardText>
    </Testcard>
  );
};

export default TestCard;

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

[@media(hover:hover){&:hover}]:bg-violet-400
[@media(hover:hover){&:hover}]:text-white
[@media(hover:hover){&:hover}]:border-transparent
[@media(hover:hover){&:hover}]:-translate-y-1
active:translate-y+1
ease-in
duration-200

select-none
relative
animate-testComponent
`;

const TestcardText = tw.p`
ml-2
text-black
`;
