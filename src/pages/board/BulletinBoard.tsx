import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import BulletinCard from "@/components/board/BulletinCard/BulletinCard";
import PostBtn from "@/components/board/Button/PostBtn/PostBtn";
import ChangeMbtiBtn from "@/components/board/Button/ChangeMbtiBtn/ChangeMbtiBtn";
import BoardPost from "@/components/board/BoardPost/BoardPost";
import MbtiTypesModal from "@/components/common/MbtiTypesModal/MbtiTypesModal";
import MbtiColorChip from "@/components/board/MbtiColorChip/MbtiColorChip";

import {
  Main,
  BoardDiv,
  Header,
  HeaderBtns,
  MbtiTitle,
  Title,
  BulletinCardWrap
} from "./BulletinBoard.styles";

export default function BulletinBoard() {
  const [openMbtiModal, setOpenMbtiModal] = useState<boolean>(false);

  //전체 게시글
  const [postings, setPostings] = useState<Board[]>([]);
  //게시글 작성 모달 상태
  const [openBoardPost, setOpenBoardPost] = useState<boolean>(false);
  //게시글 작성완료시 유형별 게시판페이지로 이동
  const nav = useNavigate();
  const goDetailPage = (mbti: string): void => {
    nav(`/board/${mbti}`);
  };
  //게시글 상세페이지 이동
  const goCardDetailPage = (selectedId: string): void => {
    nav(`/board/cardDetail/${selectedId}`);
  };
  const handleCardClick = (id: string): void => {
    goCardDetailPage(id);
  };

  //게시글 작성 날짜 양식-> *일 전으로 변경
  const calculateDaysDiff = (date: Date): number => {
    //서버 저장되는 시간이 UTC
    //Date(UTC) -> local시간
    const pastDate: Date = new Date(date); //local(한국표준시)
    const currentDate: Date = new Date(); //local(한국표준시)

    const pastLocalTime = pastDate.getTime();
    const currentLocalTime = currentDate.getTime();

    const diffDate: number = currentLocalTime - pastLocalTime;

    // console.log("서버시간", date);
    // console.log("작성날짜", pastLocalTime);
    // console.log("현재날짜", currentLocalTime);
    // console.log("날짜 차이", diffDate);

    return Math.floor(diffDate / (1000 * 60 * 60 * 24));
  };

  //게시글 get요청
  async function getPostings() {
    try {
      const response: ResData<Board[]> = await axiosRequest.requestAxios<
        ResData<Board[]>
      >("get", mbti ? `/board/${mbti}` : "/board");
      // console.log("전체게시글", response.data);
      setPostings(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPostings();
  }, []);

  //mbti변경모달 관련

  const handleClickModal = useCallback(
    ({ currentTarget, target }: React.MouseEvent<HTMLDivElement>) => {
      if (currentTarget === target) {
        setOpenMbtiModal(false);
      }
    },
    [setOpenMbtiModal]
  );
  const handleThisConfirm = (selectedMbti: string[]) => {
    setOpenMbtiModal(false);
    const mbti = selectedMbti.join("");
    goDetailPage(mbti);
  };

  //Detail 페이지에 필요한 변수,메소드

  //파라미터 :mbti 가져오기
  const { mbti } = useParams() as { mbti: string };

  //파라미터로 mbti가 전달되자마자 게시글 데이터 업데이트
  useEffect(() => {
    getPostings();
  }, [mbti]);

  //전체 게시글
  const boardAll = postings.map((posting) => {
    return (
      <BulletinCard
        key={posting._id}
        id={posting._id}
        handleCardClick={handleCardClick}
        title={posting.title}
        content={posting.content}
        category={posting.category}
        color={posting.color}
        like={posting.like}
        createdAt={calculateDaysDiff(posting.createdAt)}
      />
    );
  });
  //유형별 게시글
  const boardDetail = postings
    .filter((posting) => posting.category === mbti)
    .map((posting) => {
      return (
        <BulletinCard
          key={posting._id}
          id={posting._id}
          handleCardClick={handleCardClick}
          title={posting.title}
          content={posting.content}
          category={posting.category}
          color={posting.color}
          like={posting.like}
          createdAt={calculateDaysDiff(posting.createdAt)}
        />
      );
    });

  return (
    <>
      {openBoardPost ? (
        <BoardPost
          onThisClose={() => setOpenBoardPost(false)}
          onThisComplete={(mbti) => {
            getPostings();
            setOpenBoardPost(false);
            goDetailPage(mbti);
          }}
          thisMbti={mbti ? mbti : "INFP"}
        />
      ) : (
        <BoardDiv>
          <div>
            {openMbtiModal && (
              <MbtiTypesModal
                isButton
                defaultMbti={["I", "N", "F", "P"]}
                onCloseModal={handleClickModal}
                onSelectMbti={handleThisConfirm}
              />
            )}
          </div>

          <Header>
            {mbti ? (
              <MbtiTitle>
                <Title>{mbti}</Title>
                <MbtiColorChip selectedMbti={mbti} />
              </MbtiTitle>
            ) : (
              <Title>MBTI 담벼락</Title>
            )}
            <HeaderBtns>
              <PostBtn setOpenBoardPost={setOpenBoardPost} />
              <ChangeMbtiBtn setOpenMbtiModal={setOpenMbtiModal} />
            </HeaderBtns>
          </Header>
          <Main>
            <BulletinCardWrap>{mbti ? boardDetail : boardAll}</BulletinCardWrap>
          </Main>
        </BoardDiv>
      )}
    </>
  );
}
