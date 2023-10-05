import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";

import {
  Container,
  Header,
  Category,
  Main,
  Title,
  Content,
  Divider,
  FooterWrap,
  Footer,
  CreateDate
} from "./CardDetail.styles";

export default function CardDetail() {
  //파라미터 :selectedId 가져오기
  const { selectedId } = useParams() as { selectedId: string };

  //게시글 상태
  const [posting, setPosting] = useState<Board>({} as Board);

  //선택한 게시글 불러오기
  async function getSelectedPosting() {
    try {
      const response: ResData<Board> = await axiosRequest.requestAxios<
        ResData<Board>
      >("get", `/board/post/${selectedId}`);
      // console.log("게시글", response.data);
      setPosting(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getSelectedPosting();
  }, []);

  //날짜 양식 맞추기
  const changeDateFormat = (date: Date): string => {
    if (date) {
      const localDate: Date = new Date(date);
      // console.log("작성날짜", localDate);
      return localDate.toISOString().substring(0, 10).replace(/-/g, ".");
    }
    return "";
  };

  return (
    <Container bgColor={posting.color}>
      <Header>
        <Category>{posting.category}</Category>
      </Header>
      <Main>
        <Title>{posting.title}</Title>
        <Content>{posting.content}</Content>
      </Main>
      <FooterWrap>
        <Divider />
        <Footer>
          <HeartBtn id={selectedId} like={posting.like} />
          <CreateDate>{changeDateFormat(posting.createdAt)}</CreateDate>
        </Footer>
      </FooterWrap>
    </Container>
  );
}
