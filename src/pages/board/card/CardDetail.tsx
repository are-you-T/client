import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";
import { ReactComponent as BackIcon } from "@/assets/img/left_line.svg";
import OptionBtn from "@/components/board/Button/OptionBtn/OptionBtn";

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
  CreateDate,
  BackBtn
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
  const twoStringFormat = (date: number): string => {
    return date < 10 ? "0" + date.toString() : date.toString();
  };
  const changeDateFormat = (date: Date): string => {
    if (date) {
      const localDate = new Date(date);
      // console.log("연도", localDate.getFullYear());
      // console.log("월", localDate.getMonth() + 1);
      // console.log("일", localDate.getDate());
      const year = localDate.getFullYear().toString();
      const month = twoStringFormat(localDate.getMonth() + 1);
      const day = twoStringFormat(localDate.getDate());

      return `${year}.${month}.${day}`;
    }
    return "";
  };
  const handleBackBtnClick = () => {
    window.history.back();
  };
  return (
    <Container bgColor={posting.color}>
      <Header>
        <BackBtn onClick={handleBackBtnClick}>
          <BackIcon />
        </BackBtn>
        <Category>{posting.category}</Category>
        <OptionBtn selectedId={selectedId} />
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
