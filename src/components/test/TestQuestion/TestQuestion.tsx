import { QuestionText } from "@/@types/index";
import * as S from "./TestQuestion.styles";

export default function TestQuestion({ idx, subject, animate }: QuestionText) {
  return (
    <S.QuestionDiv>
      <S.QuestionNum>{idx}</S.QuestionNum>
      <S.QuestionHeaderText>{subject}</S.QuestionHeaderText>
    </S.QuestionDiv>
  );
}
