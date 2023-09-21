import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import tw from "tailwind-styled-components";

const Container = styled.main<{ isOpenModal?: boolean }>`
    margin: auto;
    padding: 20px;
    width: 390px;
    min-height: calc(100vh - 170px);
    color: white;
    background: black;

    ${({ isOpenModal }) => 
        isOpenModal && 
        css`
            position: relative;
            overflow-y: hidden;
    `}
`;

const FooterBtn = tw(Link)`
    mb-[15px]
    p-4
    bg-[#FFDF3F]
    border-solid
    border-1
    rounded-[50px]
    font-bold
    text-center
    text-lg
`;

const ChartList = styled.ol`
    & div[type="bar"] {
        color: black;
    }
`;

export {
    Container,
    FooterBtn,
    ChartList
};