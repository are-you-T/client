import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import HeartBtn from "@/components/board/HeartBtn";
import OptionBtn from "@/components/board/OptionBtn";

const Card = tw.div`
  flex flex-col
  bg-white rounded-md
  w-[170px] min-h-[165px]
  cursor-pointer
`;
const Header = tw.div`
  flex flex-row justify-between items-center
  mb-2 mx-[14px] mt-[10px]
  h-[27px]
`;
const Title = tw.div`
  text-[18px] font-medium
  min-h-fit
`;

const Main = tw.div`
`;

const Content = tw.div`
  overflow-hidden
  overflow-ellipsis
  text-[15px]
  h-[68px]
  mx-[14px]
`;

const Date = tw.div`
  text-[10px] font-light
  flex justify-end
  mb-0.5 mx-[14px]

`;
const Divider = styled.div`
  height: 1px;
  width: 90%;
  margin: 0 auto;
  background-color: #e1e1e1;
`;
const Footer = tw.div`
  flex flex-row justify-between items-end
  text-[15px]
  mx-[14px] mb-[10px] mt-0.5 
`;
const Category = tw.div`
  font-medium
`;
const Heart = tw.div`
  flex flex-row items-center
`;

const HeartCount = tw.div`
  font-light
  ml-[4px]
`;
//@ts-ignore
export default function BulletinCard({
  //@ts-ignore
  showModal,
  //@ts-ignore
  title,
  //@ts-ignore
  content,
  //@ts-ignore
  category,
  //@ts-ignore
  like,
  //@ts-ignore
  createdAt,
}) {
  return (
    <Card onClick={showModal}>
      <Header>
        <Title>{title}</Title>
        <OptionBtn />
      </Header>

      <Main>
        <Content>{content}</Content>
        <Date>{createdAt}일 전</Date>
      </Main>

      <Divider />
      <Footer>
        <Category>{category}</Category>
        <Heart>
          <HeartBtn />
          <HeartCount>{like}</HeartCount>
        </Heart>
      </Footer>
    </Card>
  );
}
