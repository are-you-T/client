import tw, { styled } from "twin.macro";

export const ModalBg = tw.div`
w-[390px] h-full 
fixed 
top-0 
left-1/2 -translate-x-1/2
 
 backdrop-blur-sm 
 bg-black/[.3]
 z-10
 absolute
`;
export const ModalWrap = tw.form`
w-[320px] h-[200px] p-[28px] top-[40%]
bg-white rounded-xl
flex flex-col justify-between
z-20 fixed
`;
export const Title = tw.div`
font-bold text-[20px]
`;
export const Content = tw.div`
flex flex-col gap-[4px]
`;
export const Instruction = tw.label`
text-black`;

export const InputForm = styled.form`
  ${tw`
  h-[30px] px-[8px] 
  border-[1px] border-[#d9d9d9] border-solid 
  flex items-center`}

  & > input {
    width: 100%;
  }
`;

export const ConfirmWrap = tw.div`
flex flex-row justify-end gap-[8px]
`;

export const CancelBtn = tw.button`
w-[50px] h-[30px] bg-[#d9d9d9] rounded-md
text-white font-medium

`;

export const OkBtn = tw.button`
w-[50px] h-[30px] bg-black rounded-md
text-white font-medium
`;
