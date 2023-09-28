import tw from 'twin.macro';

const Section = tw.section`
  w-[390px]
  m-auto
  flex
  flex-col
  items-center
  bg-black
  pt-10
`;

const StyledApexChart = tw.div`
  w-full
  bg-black
  rounded-2xl
`;

const Title = tw.h3`
  font-bold
  text-6xl
  text-center
  pb-[60px]
  text-[#000]
  bg-[#00B26E]
`;

const ButtonWrap = tw.div`
  w-full
  pb-10
  flex
  flex-col
  items-center
  justify-center
`;

const Button = tw.button`
  btn
  w-80
  h-16
  bg-yellow-400
  rounded-full
  text-lg
  mt-5
  border-0
  font-bold
  text-black
`;

const ModalWrap = tw.div`
  fixed
  top-0
  left-0
  w-full
  h-full
  bg-black
  bg-black/[.3]
  backdrop-blur-sm
  z-50
  flex
  items-center
  justify-center
`;

export {
  Section,
  StyledApexChart,
  Title,
  ButtonWrap,
  Button,
  ModalWrap
}