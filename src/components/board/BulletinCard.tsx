import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import axiosRequest from "@/api/index";
import { resData, board } from "@/interfaces/index";

import HeartBtn from "@/components/board/HeartBtn";
import OptionBtn from "@/components/board/OptionBtn";

const Card = tw.div`
  flex flex-col
  bg-white rounded-md
  w-[170px] min-h-[165px]
  cursor-pointer
  text-gray-800
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
  background-color: #898989;
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

interface BulletinCardProps {
  id: string;
  showModal: (id: string, like: number) => void;
  title: string;
  content: string;
  category: string;
  color: string;
  like: number;
  createdAt: string;
}
export default function BulletinCard({
  id,
  showModal,
  title,
  content,
  category,
  color,
  like,
  createdAt,
}: BulletinCardProps) {
  return (
    <Card id={id} style={{ backgroundColor: color }}>
      <div onClick={() => showModal(id, like)}>
        <Header>
          <Title>{title}</Title>
          <OptionBtn />
        </Header>

        <Main>
          <Content>{content}</Content>
          <Date>{createdAt}일 전</Date>
        </Main>
      </div>

      <Divider />

      <Footer>
        <Category>{category}</Category>
        <HeartBtn id={id} like={like} />
      </Footer>
    </Card>
  );
}
