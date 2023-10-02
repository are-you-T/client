import { TestCardProps } from "@/@types/index";
import * as S from "./TestCard.styles";

const TestCard = ({
  answer,
  index,
  onClick,
  animate,
  animationStart
}: TestCardProps) => {
  const onClickCard = onClick(index);
  return (
    <S.Testcard
      onClick={() => {
        onClickCard();
        animationStart();
      }}
      key={animate.toString()}
    >
      <S.TestcardText>{answer}</S.TestcardText>
    </S.Testcard>
  );
};

export default TestCard;
