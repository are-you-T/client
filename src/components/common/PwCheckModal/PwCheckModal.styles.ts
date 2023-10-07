import tw, { styled } from "twin.macro";

export const ModalBg = tw.div`
w-[390px] 
fixed 
top-0 
left-1/2 -translate-x-1/2
 h-full 
 backdrop-blur-sm 
 bg-black/[.3]
 z-1
`;
export const ModalWrap = tw.div`
  fixed
  top-[40%]
  bg-white
  rounded-3xl 
  p-[20px]
  text-black 
  w-[360px]
  h-[125px] 
  flex
  flex-col
  justify-between
  text-center
  z-10
`;
export const ModalDetail = tw.div`
  flex
  justify-between
`;
export const InputForm = tw.input`
w-[230px]  h-[30px] rounded-[10px] bg-black p-[16px] text-[12px] text-white
`;
export const ConfirmBtn = tw.button`
w-[25%] h-[30px] bg-black rounded-[10px] text-white text-[14px] font-semibold
`;
