import * as S from "./StatsMbtiButtons.styles";

interface StatsMbtiButtonsProps {
  targetChar: string;
  mbtiType: string;
  onClickType: (mbtiCharIdx: number) => void;
}

function StatsMbtiButtons({
  targetChar,
  mbtiType,
  onClickType
}: StatsMbtiButtonsProps) {
  const mbtiChars = mbtiType.split("");

  return (
    <S.Container>
      {mbtiChars.map((char, idx) => (
        <div key={idx}>
          {char === targetChar ? (
            <S.ActiveButton onClick={() => onClickType(idx)}>
              {char}
            </S.ActiveButton>
          ) : (
            <S.Button onClick={() => onClickType(idx)}>{char}</S.Button>
          )}
        </div>
      ))}
    </S.Container>
  );
}

export default StatsMbtiButtons;
