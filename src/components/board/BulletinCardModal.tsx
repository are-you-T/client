import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

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
`;
const Footer = tw.div`
  flex flex-row justify-between items-center
  self-end
  w-full
  px-6 pt-2 mt-auto mb-4
  border-t
`;

const Date = tw.div`
  font-extralight
  mb-0.5
`;

const Heart = tw.div`
  flex flex-row items-center
`;
const HeartBtn = tw.button`
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
                stroke-width="2"
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

        <Footer>
          <Heart>
            <HeartBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                fill="none"
              >
                <path
                  stroke="#898989"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                  d="M4.5 1C2.567 1 1 2.491 1 4.33c0 1.486.613 5.01 6.642 8.573a.71.71 0 0 0 .716 0C14.388 9.34 15 5.816 15 4.331 15 2.49 13.433 1 11.5 1S8 3.019 8 3.019 6.433 1 4.5 1Z"
                />
              </svg>
            </HeartBtn>
            <HeartCount>23</HeartCount>
          </Heart>
          <Date>2023.07.20</Date>
        </Footer>
      </CardModal>
    </CardModalContainer>
  );
}
