import { useState } from "react";
import * as S from "./StatsMbtiButtons.styles";

interface StatsMbtiButtonsProps {
  mbtiType: string;
}

function StatsMbtiButtons({ mbtiType }: StatsMbtiButtonsProps) {
  const mbtiChars = mbtiType.split("");
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  return (
    <S.Container>
      {mbtiChars.map((char, idx) => (
        <div key={idx}>
          {idx === activeButtonIndex ? (
            <S.ActiveButton onClick={() => handleClick(idx)}>
              {char}
            </S.ActiveButton>
          ) : (
            <S.Button onClick={() => handleClick(idx)}>{char}</S.Button>
          )}
        </div>
      ))}
    </S.Container>
  );
}

export default StatsMbtiButtons;
