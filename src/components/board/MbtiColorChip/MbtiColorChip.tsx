import colorData from "@/constants/bgColor";

import { MbtiColor } from "./MbtiColorChip.styles";

interface MbtiColorChipProps {
  selectedMbti: string;
}
interface Color {
  mbti: string;
  out: string;
  in: string;
}
export default function MbtiColorChip({ selectedMbti }: MbtiColorChipProps) {
  //공통 컬러 데이타
  const colors: Color[] = colorData;
  const selectedColorData: Color | undefined = colors.find(
    (el) => el.mbti === selectedMbti
  );
  if (selectedColorData === undefined) {
    throw new Error("에러가 발생했습니다.");
  }

  // console.log(selectedColorData);

  //mbti별 컬러
  const colorIn = selectedColorData.in;
  const colorOut = selectedColorData.out;

  return (
    <MbtiColor>
      {/* 컬러 props로 받기 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="36"
        fill="none"
      >
        <ellipse
          cx="18.088"
          cy="17.833"
          fill={colorIn}
          rx="18.088"
          ry="17.833"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="36"
        fill="none"
      >
        <ellipse
          cx="18.088"
          cy="17.833"
          fill={colorOut}
          rx="18.088"
          ry="17.833"
        />
      </svg>
    </MbtiColor>
  );
}
