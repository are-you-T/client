import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import axiosRequest from "@/api/index";
import { UserResponseProps } from "@/@types/index";
import { useNavigate } from "react-router-dom";
import LoadingImg from "@/components/test/LoadingImg";

function Loading({ userResponse, visible }: UserResponseProps) {
  // 애니메이션 *************************************************************
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const texts = ["T", "F", "N", "S", "E", "I", "P", "J"];
  const colors = [
    "#B2ACF9",
    "#FFDF3F",
    "#EFC7D6",
    "#9FEEA2",
    "#ECEE9F",
    "#78D9EE",
    "#FF9D42",
    "#F9BAAC",
    "#AC78EE",
    "#C7E1EF",
  ];

  useEffect(() => {
    if (visible) {
      const colorInterval = setInterval(changeColor, 450);
      const textInterval = setInterval(changeText, 450);
      return () => {
        clearInterval(colorInterval);
        clearInterval(textInterval);
      };
    }
  }, [currentColorIndex, currentTextIndex, visible]);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const changeText = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  // mbti 계산 *************************************************************
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

  const navigate = useNavigate();

  useEffect(() => {
    const calculateCategoryValues = () => {
      const energyData = { E: 0, I: 0 };
      const awarenessData = { N: 0, S: 0 };
      const judgementData = { T: 0, F: 0 };
      const lifeData = { J: 0, P: 0 };

      let energySum = 0;
      let awarenessSum = 0;
      let judgementSum = 0;
      let lifeSum = 0;

      for (const item of userResponse.mbtiData) {
        const { mbtiType, selected, proportion } = item;

        if (mbtiType !== selected) {
          item.proportion = 100 - proportion;
        }

        switch (selected) {
          case "E":
          case "I":
            energyData[selected] += proportion;
            energySum += proportion;
            break;
          case "N":
          case "S":
            awarenessData[selected] += proportion;
            awarenessSum += proportion;
            break;
          case "T":
          case "F":
            judgementData[selected] += proportion;
            judgementSum += proportion;
            break;
          case "J":
          case "P":
            lifeData[selected] += proportion;
            lifeSum += proportion;
            break;
          default:
            break;
        }
      }

      energyData.E = Math.round((energyData.E / energySum) * 100);
      energyData.I = Math.round((energyData.I / energySum) * 100);

      awarenessData.N = Math.round((awarenessData.N / awarenessSum) * 100);
      awarenessData.S = Math.round((awarenessData.S / awarenessSum) * 100);

      judgementData.T = Math.round((judgementData.T / judgementSum) * 100);
      judgementData.F = Math.round((judgementData.F / judgementSum) * 100);

      lifeData.J = Math.round((lifeData.J / lifeSum) * 100);
      lifeData.P = Math.round((lifeData.P / lifeSum) * 100);

      setEnergy(energyData);
      setAwareness(awarenessData);
      setJudgement(judgementData);
      setLife(lifeData);
    };

    calculateCategoryValues();

    // console.log(
    //   "energy",
    //   energy,
    //   "awareness",
    //   awareness,
    //   "judgement",
    //   judgement,
    //   "life",
    //   life
    // );

    // visible 상태가 true일 때 한 번만 호출
    if (visible) {
      // 결과 페이지로 이동 ***** 4초로 설정
      const timer = setTimeout(() => {
        calculateMBTIType();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [userResponse, visible]);
  // console.log("🚀🚀🚀🚀🚀🚀테스트에서 보내주는 userResponse:", userResponse);

  const calculateMBTIType = async () => {
    const { E, I } = energy;
    const { N, S } = awareness;
    const { T, F } = judgement;
    const { J, P } = life;

    const energyType = E > I ? "E" : "I";
    const awarenessType = N > S ? "N" : "S";
    const judgementType = T > F ? "T" : "F";
    const lifeType = J > P ? "J" : "P";

    const userMBTI = `${energyType}${awarenessType}${judgementType}${lifeType}`;

    const updatedUserResponse = {
      ...userResponse,
      mbtiType: userMBTI,
    };

    // console.log("put할 때 보내주는 데이터 ", updatedUserResponse);

    const resultData = {
      energy,
      awareness,
      judgement,
      life,
      mbtiType: updatedUserResponse.mbtiType,
    };

    try {
      const putResponse: UserResponseProps = await axiosRequest.requestAxios(
        "put",
        "/stats",
        updatedUserResponse
      );

      // console.log("USERMBTI", userMBTI);
      const patchResponse = await axiosRequest.requestAxios(
        "patch",
        `/stats/${userMBTI}`
      );

      // console.log(patchResponse, "🚀🚀🚀🚀🚀🚀patch 요청 response");
      // console.log(putResponse, "🚀🚀🚀🚀🚀🚀put 요청 response");
      // console.log("resultData", resultData);

      // 결과페이지에 데이터 전송 ***********************************
      const queryParams = new URLSearchParams({ mbti: resultData.mbtiType });
      navigate("/result?" + queryParams.toString(), { state: { resultData } });
    } catch (error) {
      // console.error(error);
    }
  };

  return visible ? (
    <LoadingSection>
      <TextTop>너 {texts[currentTextIndex]}야?</TextTop>
      <LoadingImg color={colors[currentColorIndex]} />
      <TextBottom>분석중...</TextBottom>
    </LoadingSection>
  ) : (
    <div />
  );
}

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
