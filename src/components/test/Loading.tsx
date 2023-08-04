import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { answer, MBTIData, userResponseProps } from "@/interfaces/index";
import LoadingImg from "@/components/test/LodingImg";

const Loading: React.FC<userResponseProps> = ({ visible, userResponse }) => {
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
    const colorInterval = setInterval(changeColor, 450);
    const textInterval = setInterval(changeText, 450);
    return () => {
      clearInterval(colorInterval);
      clearInterval(textInterval);
    };
  }, [currentColorIndex, currentTextIndex]);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const changeText = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
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
