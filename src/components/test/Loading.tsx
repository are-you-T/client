import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { ReactComponent as LoadingImg } from "@/assets/img/loading_img.svg";

type Answer = {
  [key: string]: string;
};

type MBTIData = {
  idx: number;
  subject: string;
  answer: Answer;
  mbtiType: string;
  selection: string | number;
  proportion: number;
};

type UserResponseProps = {
  userResponse: {
    parent: string;
    mbtiData: MBTIData[];
  };
  visible: boolean;
};

const Loading: React.FC<UserResponseProps> = ({ userResponse, visible }) => {
  const [energy, setEnergy] = useState<{ E: number; I: number }>({
    E: 0,
    I: 0,
  });
  const [awareness, setAwareness] = useState<{ N: number; S: number }>({
    N: 0,
    S: 0,
  });
  const [judgement, setJudgement] = useState<{ T: number; F: number }>({
    T: 0,
    F: 0,
  });
  const [life, setLife] = useState<{ J: number; P: number }>({ J: 0, P: 0 });

  useEffect(() => {
    const calculateCategoryValues = () => {
      const energyData = { E: 0, I: 0 };
      const awarenessData = { N: 0, S: 0 };
      const judgementData = { T: 0, F: 0 };
      const lifeData = { J: 0, P: 0 };

      for (const item of userResponse.mbtiData) {
        console.log(
          "🚀 ~ file: Loading.tsx:49 ~ calculateCategoryValues ~ userResponse.mbtiData:",
          item
        );
        const { mbtiType, selection, proportion } = item;

        if (mbtiType !== selection) {
          item.proportion = 100 - proportion;
        }

        switch (selection) {
          case "E":
          case "I":
            energyData[selection] += proportion;
            break;
          case "N":
          case "S":
            awarenessData[selection] += proportion;
            break;
          case "T":
          case "F":
            judgementData[selection] += proportion;
            break;
          case "J":
          case "P":
            lifeData[selection] += proportion;
            break;
          default:
            break;
        }

        console.log(selection);
      }

      setEnergy(energyData);
      setAwareness(awarenessData);
      setJudgement(judgementData);
      setLife(lifeData);
    };

    calculateCategoryValues();

    console.log(
      "energy",
      energy,
      "awareness",
      awareness,
      "judgement",
      judgement,
      "life",
      life
    );
  }, [userResponse]);

  const calculateMBTIType = () => {
    const { E, I } = energy;
    const { N, S } = awareness;
    const { T, F } = judgement;
    const { J, P } = life;

    const energyType = E > I ? "E" : "I";
    const awarenessType = N > S ? "N" : "S";
    const judgementType = T > F ? "T" : "F";
    const lifeType = J > P ? "J" : "P";

    return `${energyType}${awarenessType}${judgementType}${lifeType}`;
  };

  calculateMBTIType();
  console.log(
    "🚀 ~ file: Loading.tsx:122 ~ calculateMBTIType:",
    calculateMBTIType()
  );

  return visible ? (
    <LoadingSection>
      <TextTop>너 T야?</TextTop>
      <LoadingImg />
      <TextBottom>분석중...</TextBottom>
    </LoadingSection>
  ) : (
    <div />
  );
};

export default Loading;

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
