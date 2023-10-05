import tw, { styled } from "twin.macro";

export const Main = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  overflow: auto;
  padding-bottom: 71px;
`;
export const BoardDiv = tw.div`
  flex flex-col
  h-screen w-[390px] bg-black
  px-[17px] mx-auto
  relative
`;
export const Header = tw.div`
  flex flex-row justify-between items-center
  mt-4 mb-7 
`;
export const HeaderBtns = tw.div`
flex flex-row items-center
gap-2
`;
export const MbtiTitle = tw.div`
 flex flex-row items-center gap-3
`;
export const Title = tw.div`
  text-[43px] leading-[51px]  font-bold text-white
`;

export const BulletinCardWrap = tw.div`
  flex flex-wrap justify-start gap-[15px]
  mx-auto
`;
