import React from "react";
import tw from "tailwind-styled-components";
import { ReactComponent as LoadingImg } from "@/assets/img/loading_img.svg";

interface LoadingProps {
  visible: boolean;
  userResponse: any;
}

export default function Loading({ visible, userResponse }: LoadingProps) {
  console.log(
    "🚀 ~ file: Loading.tsx:13 ~ Loading ~ userResponse:",
    userResponse
  );
  const calculateScores = () => {
    // 유형별 점수 계산
    const energy: { [key: string]: number } = { E: 0, I: 0 };
    const awareness: { [key: string]: number } = { N: 0, S: 0 };
    const judgement: { [key: string]: number } = { T: 0, F: 0 };
    const life: { [key: string]: number } = { J: 0, P: 0 };

    userResponse.mbtiData.forEach((item: any) => {
      const mbtiType = item.mbtiType;
      const proportion = item.proportion;
      const selected = item.selected;

      if (mbtiType === "E") {
        energy.E += proportion;
        energy.I += 100 - proportion;
      } else if (mbtiType === "N") {
        awareness.N += proportion;
        awareness.S += 100 - proportion;
      } else if (mbtiType === "T") {
        judgement.T += proportion;
        judgement.F += 100 - proportion;
      } else if (mbtiType === "J") {
        life.J += proportion;
        life.P += 100 - proportion;
      }
    });

    return { energy, awareness, judgement, life };
  };

  const scores = calculateScores();

  return visible ? (
    <LoadingSection>
      <TextTop>너 T야?</TextTop>
      <LoadingImg />
      <TextBottom>분석중...</TextBottom>
    </LoadingSection>
  ) : (
    <div />
  );
}

const LoadingSection = tw.div`
w-[390px]
h-[790.96px] 
flex
flex-col	
items-center
justify-center	
absolute
bg-black
`;

const TextTop = tw.p`
text-white
py-3
text-xl	
`;

const TextBottom = tw.p`
text-white
py-3
text-lg
`;
