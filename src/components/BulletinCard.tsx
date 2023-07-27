import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const Card = tw.div`
  flex flex-col 
  bg-white rounded-md
  
  w-44
  
`;
const Header = tw.div`
  
`;
const Title = tw.div`
  
`;
const OptionIcon = tw.button`
`;
const Main = tw.div`
  
`;
const Content = tw.div`
  
`;
const Date = tw.div`
  
`;
const Divider = tw.div`
  divider
`;
const Footer = tw.div`
  
`;
const Category = tw.div`
  
`;
const HeartIcon = tw.button`
  
`;
const LikeCount = tw.div`
  
`;
//@ts-ignore
export default function BulletinCard() {
  return (
    <Card>
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
        <Content>내용</Content>
        <Date>작성 날짜</Date>
      </Main>

      <Divider />

      <Footer>
        <Category>category유형</Category>
        <div>
          <HeartIcon>
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
          </HeartIcon>
          <LikeCount>좋아요수</LikeCount>
        </div>
      </Footer>
    </Card>
  );
}
