import tw, { styled } from "twin.macro";

export const ModalBg = tw.div`
w-[390px] 
fixed 
top-0 
left-1/2 
-translate-x-1/2 
h-full 
backdrop-blur-sm 
bg-black/[.3]
`;

export const ModalWrap = tw.div`
bg-white 
rounded-t-3xl 
p-8 
text-black 
fixed 
bottom-0 
left-1/2 
-translate-x-1/2 
w-[390px] 
m-auto 
z-10
`;

export const ActiveList = styled.li`
  ${tw`relative`}

  & > div {
    ${tw`z-10`}

    & label {
      &.active {
        ${tw`text-black`}
      }
    }
  }
`;

export const ActiveList1 = styled.li`
  position: relative;
  & > div {
    z-index: 1;
    & label {
      &.active {
        color: black;
      }
    }
  }
`;

export const MbtiButton = tw.button`
block 
text-2xl 
font-black 
w-full 
bg-[#FEDF40] 
text-black 
py-3 
rounded-full 
mt-5
`;

export const MbtiLabel = tw.label`
block 
w-full 
cursor-pointer 
p-2
`;

export const MbtiList = tw(ActiveList)`
bg-black 
w-full 
text-white 
flex 
items-center 
p-4 
rounded-full 
text-5xl 
font-black 
mt-5
`;

export const Toggle = styled.div`
  ${tw`absolute z-[-1] bg-[#b2acf9] block w-1/2 h-[calc(100% - 20px)] transition-all duration-200 rounded-[9999px]`}

  &.left {
    ${tw`left-[calc(0% + 10px)]`}
  }
  
  &.right {
    ${tw`left-[calc(50% - 10px)]`}
  }
`;

export const Toggle1 = styled.div`
  position: absolute;
  z-index: -1;
  background-color: #b2acf9;
  display: block;
  width: 50%;
  height: calc(100% - 20px);
  transition: all 0.2s;
  border-radius: 9999px;
  &.left {
    left: calc(0% + 10px);
  }
  &.right {
    left: calc(50% - 10px);
  }
`;
