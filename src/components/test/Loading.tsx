import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { ReactComponent as LoadingImg } from "@/assets/img/loading_img.svg";
import { BsBluetooth } from "react-icons/bs";
//@ts-ignore
export default function Loading({ visible, userResponse }) {
  const [currnetTextIndex, setCurrentTextIndex] = useState(0);
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
  }, [currentColorIndex, currnetTextIndex]);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const changeText = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  return visible ? (
    <LoadingSection>
      <TextTop>너 {texts[currnetTextIndex]}야?</TextTop>
      <svg
        width="182"
        height="211"
        viewBox="0 0 182 211"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.207031 172.801C3.37911 129.47 42.6285 95.2256 90.5808 95.2256C138.826 95.2256 178.262 129.89 181.009 173.596C158.01 196.7 126.175 211 91.0001 211C55.4234 211 23.2634 196.371 0.207031 172.801Z"
          fill={colors[currentColorIndex]}
        />
        <rect
          x="108.191"
          y="194.185"
          width="60.2646"
          height="22"
          rx="11"
          transform="rotate(-150 108.191 194.185)"
          fill="#0272F1"
        />
        <circle cx="71" cy="158" r="27" fill="#0272F1" />
        <circle cx="70.5" cy="157.5" r="17.5" fill="white" />
        <path
          d="M59.9296 153.858C58.864 153.47 58.3017 152.282 58.8411 151.284C59.5035 150.06 60.3467 148.937 61.3455 147.956C62.8342 146.494 64.6309 145.383 66.6042 144.704C68.5775 144.026 70.6776 143.797 72.7507 144.035C74.1416 144.194 75.4968 144.561 76.7723 145.12C77.811 145.575 78.0982 146.857 77.4963 147.819V147.819C76.8945 148.78 75.6306 149.048 74.5661 148.657C73.8315 148.387 73.0652 148.205 72.2829 148.115C70.8179 147.947 69.3338 148.108 67.9393 148.588C66.5448 149.067 65.2752 149.852 64.2231 150.886C63.6614 151.437 63.1693 152.053 62.7558 152.717C62.1567 153.68 60.9952 154.246 59.9296 153.858V153.858Z"
          fill="#0272F1"
        />
        <ellipse
          cx="90.3915"
          cy="59.3785"
          rx="64.6734"
          ry="59.3785"
          fill={colors[currentColorIndex]}
        />
        <ellipse
          cx="108.356"
          cy="41.7921"
          rx="17.5866"
          ry="16.8302"
          fill="white"
        />
        <ellipse
          cx="108.545"
          cy="41.9809"
          rx="6.80773"
          ry="7.18594"
          fill="black"
        />
        <ellipse
          cx="68.6447"
          cy="42.1701"
          rx="17.5866"
          ry="16.8302"
          fill="white"
        />
        <ellipse
          cx="68.8336"
          cy="42.3593"
          rx="6.80773"
          ry="7.18594"
          fill="black"
        />
        <ellipse
          cx="90.0133"
          cy="76.9651"
          rx="15.1283"
          ry="6.99683"
          fill="white"
        />
      </svg>
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
