import tw from "twin.macro";

export const ModalWrapCenter = tw.div`
bg-white rounded-3xl p-8 text-black fixed left-1/2 top-1/2 -translate-x-1/2 w-[370px] m-auto
z-20 h-[114px] flex items-center justify-center 
`;
export const ModalBg = tw.div`
w-[390px] 
fixed 
top-0 
left-1/2 -translate-x-1/2
 h-full 
 backdrop-blur-sm 
 bg-black/[.3]
 z-[2]
`;
export const Main = tw.h3`
text-xl font-black text-center flex items-center justify-center 
`;
