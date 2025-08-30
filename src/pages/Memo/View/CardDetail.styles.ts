import tw, { styled } from "twin.macro";

export const Container = styled.div<{ bgColor: string }>`
  ${tw`w-[390px]  mx-auto h-[100vh]
  flex flex-col items-center
  relative`}
  background: ${(props) => props.bgColor};
`;
export const Header = tw.div`
  h-[76px] w-full px-[24px]
  flex flex-row justify-between items-center
  `;
export const BackBtn = tw.div`
cursor-pointer
  `;
export const Category = tw.div`
  text-2xl font-bold
  my-3.5
  `;
export const Main = styled.div`
  ${tw`w-[330px] rounded-3xl h-[80%]
    bg-white opacity-100
    flex flex-col`}
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));
  margin: 10px auto 80px;
`;

export const Title = tw.div`
  text-xl font-medium
  my-[16px]
  px-[18px]

`;
export const Content = styled.pre`
  ${tw`
  px-[20px] mb-[20px]  
  text-base
  overflow-y-auto
  flex-grow
  whitespace-pre-wrap`}

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eaeaea;
    border-radius: 5px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;
export const Divider = styled.div`
  height: 0.5px;
  width: 90%;
  margin: 0 auto;
  background-color: black;
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
export const CreateDate = tw.div`
  font-extralight
`;
