import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";
import { ReactComponent as BackIcon } from "@/assets/img/left_line.svg";
import OptionBtn from "@/components/board/Button/OptionBtn/OptionBtn";
import PwCheckModal from "@/components/common/PwCheckModal/PwCheckModal";
import BoardPost from "@/components/board/BoardPost/BoardPost";

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
  //뒤로가기
  const handleBackBtnClick = () => {
    window.history.back();
  };
  //비밀번호 확인 모달
  const [isPwCheckModalOpen, setIsPwCheckModalOpen] = useState<boolean>(false);
  const showModal = async () => {
    setIsPwCheckModalOpen(!isPwCheckModalOpen);
    // await getPosting();
  };

  //게시글 수정 모달
  const [openBoardEdit, setOpenBoardEdit] = useState<boolean>(false);

  const checkCorrectPw = (openBoardEdit: boolean) => {
    setOpenBoardEdit(openBoardEdit);
  };

  return (
    <>
      {openBoardEdit ? (
        <BoardPost
          onThisClose={() => setOpenBoardEdit(false)}
          onThisComplete={() => {
            //patch요청
            //모달닫기
            //수정한 카드 상세페이지이동
          }}
          thisMbti={posting.category}
          existingPost={posting}
        />
      ) : (
        <Container bgColor={posting.color}>
          {isPwCheckModalOpen && (
            <PwCheckModal
              onClose={showModal}
              selectedId={selectedId}
              checkCorrectPw={checkCorrectPw}
            />
          )}
          <Header>
            <BackBtn onClick={handleBackBtnClick}>
              <BackIcon />
            </BackBtn>
            <Category>{posting.category}</Category>
            <OptionBtn selectedId={selectedId} showModal={showModal} />
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
      )}
    </>
  );
}
