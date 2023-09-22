import styled, { css } from "styled-components";
import tw from "tailwind-styled-components";

const circularBtn = css`
    display: block;
    padding: 1rem 0;
    background-color: #FFDF3F;
    border: 1px solid #E5E7EB;
    border-radius: 9999px;
    font-size: 1.125rem;
`;

const Container = styled.main<{ hasData: boolean, isOpenModal: boolean }>`
    margin: auto;
    padding: 0;
    width: 390px;
    min-height: calc(100vh - 170px);
    color: white;
    background: black;

    ${({ hasData }) => 
        !hasData &&
        css`
            display: flex;
            align-items: end;
    `}

    ${({ isOpenModal }) => 
        isOpenModal && 
        css`
            position: relative;
            overflow-y: hidden;
    `}
`;

const ChartList = styled.ol`
    list-style: decimal;
    
    & div[type="bar"] {
        color: black;
    }
`;

const Footer = styled.div<{ hasData: boolean }>`
    margin: auto;
    padding: 20px;
    font-size: 30px;
    width: 100%;
    color: black;
    text-align: center;
    font-weight: bold;
    
    ${({ hasData }) => !hasData && 'background-color: #00B26E;' }

    > h2.no-data {
        margin-bottom: 7.3rem;
        font-size: 3.75rem;
    }

    > a {
        ${circularBtn}
    }

    > *:not(:last-child) {
        margin-bottom: 15px;
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