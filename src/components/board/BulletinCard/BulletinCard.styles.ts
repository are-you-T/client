import { keyframes } from "styled-components";
import tw, { styled, css } from "twin.macro";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Card = styled.div`
  ${tw`flex flex-col
  bg-white rounded-md
  w-[170px] h-[165px]
  cursor-pointer
  text-gray-800
  relative`}

  animation: ${fadeIn} 0.5s ease-in;
`;

export const Header = tw.div`
  flex flex-row justify-between items-center
  mb-2 mx-[14px] mt-[10px]
  
`;
export const Title = tw.div`
  text-[15px] font-medium
  
`;

export const Main = tw.div`
`;

export const Content = tw.div`
  overflow-hidden
  text-[13px]
  mx-[14px]
  
`;

export const Date = tw.div`
  text-[10px] font-light
  flex justify-end
  mb-0.5 mr-[2px]

`;
export const Divider = styled.div`
  height: 1px;

  margin: 0 auto;
  background-color: #898989;
`;
export const Footer = tw.div`
  w-full
  flex flex-col
  text-[15px]
  px-[10px] mb-[10px] mt-0.5 
  absolute bottom-0 left-0 right-0
`;
export const FooterCol = tw.div`
  flex flex-row justify-between
  px-[2px]
  
`;
export const Category = tw.div`
  font-medium
`;
