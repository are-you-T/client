import { useState, useEffect } from "react";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";

import {
  CardModalContainer,
  CardModal,
  Header,
  Category,
  CloseBtn,
  Main,
  Title,
  Content,
  Divider,
  FooterWrap,
  Footer,
  Date,
} from "./BulletinCardModal.styles";

interface BulletinCardModalProps {
  closeModal: () => void;
  selectedId: string;
}
export default function BulletinCardModal({
  closeModal,
  selectedId,
}: BulletinCardModalProps) {
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
    // console.log(date);
    if (date) {
      return date.toString().substring(0, 10).replace(/-/g, ".");
    }
    return "";
  };
  // 이벤트 버블링을 막음
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <CardModalContainer onClick={closeModal}>
      <CardModal onClick={handleClick}>
        <Header>
          <Category>{posting.category}</Category>

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
          <Title>{posting.title}</Title>
          <Content>{posting.content}</Content>
        </Main>
        <FooterWrap>
          <Divider />
          <Footer>
            <HeartBtn id={selectedId} like={posting.like} />
            <Date>{changeDateFormat(posting.createdAt)}</Date>
          </Footer>
        </FooterWrap>
      </CardModal>
    </CardModalContainer>
  );
}
