import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import HeartBtn from "@/components/board/HeartBtn";

const CardModalContainer = tw.div`
  h-full
  fixed z-50 inset-0
  bg-black-semi-transparent
  flex justify-center items-center
  `;
const CardModal = tw.div`
  w-80 h-3/4 rounded-3xl
  bg-white opacity-100
  flex flex-col
  relative
  `;
const Header = tw.div`
  flex flex-row justify-center items-center
  relative
  mb-4
  
  `;
const Category = tw.div`
  text-2xl font-bold
  my-3.5
  `;
const CloseBtn = tw.button`
  absolute top-3.5 right-3.5
  `;
const Main = tw.div`
  flex flex-col
  px-6
`;
const Title = tw.div`
  text-xl font-medium
  mb-3.5
`;
const Content = tw.div`
  text-base
  overflow-auto
  flex-grow

`;
const Divider = styled.div`
  height: 1px;
  width: 90%;
  margin: 0 auto;
  background-color: #e1e1e1;
`;
const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0px 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Footer = tw.div`
  flex flex-row justify-between items-center
  w-full
  px-6 pt-[10px]
`;
const Date = tw.div`
  font-extralight
`;

const Heart = tw.div`
  flex flex-row items-center
`;

const HeartCount = tw.div`
  font-extralight
  ml-1
`;
//@ts-ignore
export default function BulletinCardModal({ closeModal }) {
  return (
    <CardModalContainer>
      <CardModal>
        <Header>
          <Category>INTJ</Category>
          {/* close icon */}
          <CloseBtn onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="none"
            >
              <circle cx="13.5" cy="13.5" r="13.5" fill="#000" />
              <path
                stroke="#fff"
                strokeWidth="2"
                d="m9.233 9.233 8.394 8.394M17.627 9.233l-8.394 8.394"
              />
            </svg>
          </CloseBtn>
        </Header>

        <Main>
          <Title>제목</Title>
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quasi
            omnis rem exercitationem voluptatum, inventore tempore. Veritatis
            placeat, voluptate fuga hic itaque officia libero ut similique at
            nihil explicabo minus.
          </Content>
        </Main>
        <FooterWrap>
          <Divider />
          <Footer>
            <Heart>
              <HeartBtn />
              <HeartCount>23</HeartCount>
            </Heart>

            <Date>2023.07.20</Date>
          </Footer>
        </FooterWrap>
      </CardModal>
    </CardModalContainer>
  );
}