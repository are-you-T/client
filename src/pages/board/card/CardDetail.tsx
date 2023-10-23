import { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";

import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import { ReactComponent as Comment } from "@/assets/img/comment.svg";

import axiosRequest from "@/api/index";
import { ResData, Board, BoardPassword } from "@/@types/index";

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
import { ModalBg } from "@/components/common/MbtiTypesModal/MbtiTypesModal.styles";
import {
  CommentModalWrap,
  ModalWrapCenter
} from "@/components/board/BoardPost/BoardPost.styles";
import { CommentContent } from "@/components/comment/CommentContent";
import { CommentPostContent } from "@/components/comment/CommentPost";

// 모달 배경 닫기
function ModalClose({
  children,
  onClose
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <ModalBg onClick={handleModalBgClick}>{children}</ModalBg>;
}
//댓글 모달 임시
function CommentModal({
  onClose,
  selectedId
}: {
  onClose: () => void;
  selectedId: string;
}) {
  console.log("dkdlel", selectedId);
  return (
    <ModalClose onClose={onClose}>
      <CommentModalWrap>
        {/* 모달 내용 */}
        {/* 댓글내용 컴포넌트 */}
        <CommentContent boardId={selectedId} />
        {/* 댓글등록 컴포넌트 */}
        <CommentPostContent boardId={selectedId} />
      </CommentModalWrap>
    </ModalClose>
  );
}

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
      // console.log("게시글get", response.data);
      setPosting(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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

  //모달 관리
  const [showModal, setShowModal] = useState<string>("");

  //모달 선택
  const selectModal = (modal: string) => {
    setShowModal(modal);
  };

  //게시글 수정 모달
  const [openBoardEdit, setOpenBoardEdit] = useState<boolean>(false);

  //게시글 수정 모달 닫히면 새로 불러오기
  useEffect(() => {
    getSelectedPosting();
  }, [openBoardEdit]);

  const handleClose = () => {
    setOpenBoardEdit(false); //게시글 수정 모달 닫기
    setShowModal(""); //비밀번호 확인모달 닫기
  };

  //수정 또는 삭제 모드 관리
  const [activeMode, setActiveMode] = useState(false); //비밀번호가 일치했을 때 true
  const [mode, setMode] = useState<string>(""); //수정 또는 삭제
  const selectMode = (mode: string) => {
    // console.log("mode", mode);
    setMode(mode);
  };
  //비밀번호 일치여부 확인 -> 수정 또는 삭제모드 활성화
  const checkCorrectPw = (active: boolean) => {
    // console.log("active", active);
    setActiveMode(active);
  };

  //수정 또는 삭제 기능
  useEffect(() => {
    if (activeMode && mode === "edit") setOpenBoardEdit(true);
    else if (activeMode && mode === "delete") {
      deletePosting();
      window.history.back();
    }
  }, [activeMode]);

  //게시글 delete요청
  async function deletePosting() {
    try {
      const response: ResData<BoardPassword> = await axiosRequest.requestAxios<
        ResData<BoardPassword>
      >("delete", `/board/${selectedId}`);
      // console.log("게시글삭제", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //댓글 모달
  const handleCommentClick = () => {
    setShowModal("CommentModal");
  };
  return (
    <>
      {openBoardEdit ? (
        <BoardPost
          onThisClose={handleClose}
          onThisComplete={handleClose}
          thisMbti={posting.category}
          existingPost={posting}
        />
      ) : (
        <Container bgColor={posting.color}>
          {showModal === "pwCheckModal" && (
            <PwCheckModal
              selectModal={selectModal}
              selectedId={selectedId}
              checkCorrectPw={checkCorrectPw}
            />
          )}

          <Header>
            <BackBtn onClick={handleBackBtnClick}>
              <BackIcon />
            </BackBtn>
            <Category>{posting.category}</Category>
            <OptionBtn selectModal={selectModal} selectMode={selectMode} />
          </Header>
          <Main>
            <Title>{posting.title}</Title>
            <Content>{posting.content}</Content>
          </Main>
          <FooterWrap>
            <Divider />
            <Footer>
              <HeartBtn id={selectedId} like={posting.like} />
              {/* 댓글버튼 */}
              <Comment onClick={handleCommentClick} />
              <CreateDate>{changeDateFormat(posting.createdAt)}</CreateDate>
            </Footer>
            {showModal !== "" && (
              <>
                {/* 댓글 모달 임시 */}
                {showModal === "CommentModal" && (
                  <CommentModal
                    onClose={() => setShowModal("")}
                    selectedId={selectedId}
                  />
                )}
              </>
            )}
          </FooterWrap>
        </Container>
      )}
    </>
  );
}
