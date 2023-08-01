import React from "react";
import tw from "tailwind-styled-components";
import { ReactComponent as LoadingImg} from "@/assets/img/loading_img.svg";
//@ts-ignore
export default function Loading({ visible }) {
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
