import tw, { styled } from "twin.macro";

export const CardModalContainer = tw.div`
  h-full
  fixed z-10 inset-0
  bg-black-semi-transparent
  flex justify-center items-center
  `;
export const CardModal = tw.div`
  w-80 h-3/4 rounded-3xl
  bg-white opacity-100
  flex flex-col
  relative
  `;
export const Header = tw.div`
  flex flex-row justify-center items-center
  relative
  mb-4
  
  `;
export const Category = tw.div`
  text-2xl font-bold
  my-3.5
  `;
export const CloseBtn = tw.button`
  absolute top-3.5 right-3.5
  `;
export const Main = tw.div`
  flex flex-col
  px-6
`;
export const Title = tw.div`
  text-xl font-medium
  mb-3.5
`;
export const Content = tw.div`
  text-base
  overflow-auto
  flex-grow

`;
export const Divider = styled.div`
  height: 1px;
  width: 90%;
  margin: 0 auto;
  background-color: #e1e1e1;
`;
export const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0px 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const Footer = tw.div`
  flex flex-row justify-between items-center
  w-full
  px-6 pt-[10px]
`;
export const Date = tw.div`
  font-extralight
`;
