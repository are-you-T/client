import tw, { styled } from "twin.macro";

const Container = styled.main<{ hasData: boolean; isOpenModal: boolean }>`
  min-height: calc(100vh - 170px);
  ${tw`
        m-auto
        px-[20px]
        w-[390px]
        text-white
        bg-black    
    `}

  ${({ hasData }) => !hasData && tw`flex items-end px-0`}
    ${({ isOpenModal }) => isOpenModal && tw`relative overflow-y-hidden`}
`;

const ChartList = styled.ol`
  ${tw`list-disc`}

  & div[type="bar"] {
    ${tw`text-black`}
  }
`;

const Footer = styled.div<{ hasData: boolean }>`
  ${tw`
        m-auto
        py-[20px]
        w-full
        text-[30px]
        text-black
        text-center
        font-bold
    `}

  ${({ hasData }) => !hasData && tw`bg-[#00B26E]`}

    > h2.no-data {
    ${tw`mb-28 text-[3.75rem]`}
  }

  > a {
    ${tw`
            btn
            mt-5
            w-80
            h-16
            bg-yellow-400
            border-0
            rounded-full
            text-lg
            text-black
            font-bold
        `}
  }
`;

const ModalWrapper = tw.div`
    fixed
    flex
    items-center
    justify-center
    top-0
    left-0
    w-full
    h-full
    bg-black
    bg-black/[.3]
    backdrop-blur-sm
    z-50
`;

export { Container, Footer, ChartList, ModalWrapper };
