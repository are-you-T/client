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
  w-[170px] h-[165px]
  cursor-pointer
  text-gray-800
  relative
`;
const Header = tw.div`
  flex flex-row justify-between items-center
  mb-2 mx-[14px] mt-[10px]
  
`;
const Title = tw.div`
  text-[18px] font-medium
  
`;

const Main = tw.div`
`;

const Content = tw.div`
  overflow-hidden
  text-[15px]
  mx-[14px]
  
`;

const Date = tw.div`
  text-[10px] font-light
  flex justify-end
  mb-0.5 mr-[2px]

`;
const Divider = styled.div`
  height: 1px;

  margin: 0 auto;
  background-color: #898989;
`;
const Footer = tw.div`
  w-full
  flex flex-col
  text-[15px]
  px-[10px] mb-[10px] mt-0.5 
  absolute bottom-0 left-0 right-0
`;
const FooterCol = tw.div`
  flex flex-row justify-between
  px-[2px]
  
`;
const Category = tw.div`
  font-medium
`;

interface BulletinCardProps {
  id: string;
  showModal: (id: string) => void;
  title: string;
  content: string;
  category: string;
  color: string;
  like: number;
  createdAt: number;
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
  //내용 글자수 제한
  const strLimit: number = 28;
  const toggleEllipsis = (str: string): string => {
    if (str.length > strLimit) {
      return str.slice(0, strLimit) + "...";
    } else {
      return str;
    }
  };

  //날짜 계산
  const calculateDate = (createdAt: number): string => {
    if (createdAt === 0) {
      return "오늘";
    } else {
      return `${createdAt}일 전`;
    }
  };

  return (
    <Card id={id} style={{ backgroundColor: color }}>
      <div onClick={() => showModal(id)}>
        <Header>
          <Title>{title}</Title>
          <OptionBtn />
        </Header>

        <Main>
          <Content>{toggleEllipsis(content)}</Content>
        </Main>
      </div>

      <Footer>
        <div>
          <Date>{calculateDate(createdAt)}</Date>
          <Divider />
        </div>
        <FooterCol>
          <Category>{category}</Category>
          <HeartBtn id={id} like={like} />
        </FooterCol>
      </Footer>
    </Card>
  );
}
