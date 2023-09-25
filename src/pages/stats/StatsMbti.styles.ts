import tw, { styled, css } from "twin.macro";

const circularBtn = css`
    display: block;
    padding: 1rem 0;
    background-color: #FFDF3F;
    border: 1px solid #E5E7EB;
    border-radius: 9999px;
    font-size: 1.125rem;
`;

const Container = styled.main<{ hasData: boolean, isOpenModal: boolean }>`
    min-height: calc(100vh - 170px);
    ${tw`
        m-auto
        p-0
        w-[390px]
        text-white
        bg-black    
    `}

    ${({ hasData }) => !hasData && tw`flex items-end`}
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
        p-[20px]
        w-full
        text-[30px]
        text-black
        text-center
        font-bold
    `}
    
    ${({ hasData }) => !hasData && tw`bg-[#00B26E]`}

    > h2.no-data {
        ${tw`mb-[7.3rem] text-[3.75rem]`}
    }

    > a {
        ${circularBtn}
    }

    > *:not(:last-child) {
        ${tw`mb-[15px]`}
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

export {
    Container,
    Footer,
    ChartList,
    ModalWrapper
};