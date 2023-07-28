import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const Card = tw.div`
  flex flex-col 
  bg-white rounded-md
  
  w-44 h-44
  p-3
  
`;
const Header = tw.div`
  flex flex-row justify-between items-center
  mb-2
`;
const Title = tw.div`
  text-lg font-medium
  
`;
const OptionIcon = tw.button`
`;
const Main = tw.div`
  
`;
const Content = tw.div`
  h-14
  mb-4
  text-sm
  
  overflow-hidden
  overflow-ellipsis
`;
const Date = tw.div`
  text-xs font-extralight
  flex justify-end
  mb-0.5

`;
const Divider = tw.div`
  divider
  mt-0 mb-0
  h-px
`;
const Footer = tw.div`
  flex flex-row justify-between
  mt-1
  text-sm
`;
const Category = tw.div`
  font-medium
`;
const Heart = tw.button`
  flex flex-row items-center
`;
const LikeCount = tw.div`
  font-light
  ml-0.5
`;
//@ts-ignore
export default function BulletinCard({ showModal }) {
  return (
    <Card onClick={showModal}>
      <Header>
        <Title>제목</Title>
        <OptionIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="18"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#898989" />
            <circle cx="2" cy="9" r="2" fill="#898989" />
            <circle cx="2" cy="16" r="2" fill="#898989" />
          </svg>
        </OptionIcon>
      </Header>

      <Main>
        <Content>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
          sapiente reiciendis perferendis tempora, optio cumque ipsum animi
          asperiores quae ex laboriosam perspiciatis eveniet exercitationem aut
          a sit! Harum, eligendi quod!
        </Content>
        <Date>3일 전</Date>
      </Main>

      <Divider />

      <Footer>
        <Category>INTJ</Category>
        <Heart>
          <button>
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
          </button>
          <LikeCount>23</LikeCount>
        </Heart>
      </Footer>
    </Card>
  );
}
