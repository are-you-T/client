import * as S from "./ProgressBar.styles";

export default function ProgressBar({ progressNum }: { progressNum: number }) {
  const TOTAL_SLIDES = 16;

  return (
    <S.Container>
      <S.ProgressNum>
        {progressNum}/{TOTAL_SLIDES}
      </S.ProgressNum>
      <S.Progress>
        <S.Status $progressNum={progressNum} />
      </S.Progress>
    </S.Container>
  );
}
