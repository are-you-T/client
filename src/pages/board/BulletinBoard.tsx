import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import BulletinCard from "@/components/board/BulletinCard/BulletinCard";
import BulletinCardModal from "@/components/board/BulletinCardModal/BulletinCardModal";
import PostBtn from "@/components/board/Button/PostBtn/PostBtn";
import ChangeMbtiBtn from "@/components/board/Button/ChangeMbtiBtn/ChangeMbtiBtn";
import BoardPost from "@/components/board/BoardPost";
import MbtiTypesModal, { ModalBg } from "@/components/common/MbtiTypesModal";
import MbtiColorChip from "@/components/board/MbtiColorChip/MbtiColorChip";

import {
  Main,
  BoardDiv,
  Header,
  MbtiTitle,
  Title,
  BulletinCardWrap,
  Footer,
} from "./BulletinBoard.styles";

export default function BulletinBoard() {
  // 모달창 상태
  const [openCardModal, setOpenCardModal] = useState<boolean>(false);
  const [openMbtiModal, setOpenMbtiModal] = useState<boolean>(false);
  //선택한 카드의 id값
  const [selectedId, setSelectedId] = useState<string>("");

  //전체 게시글
  const [postings, setPostings] = useState<Board[]>([]);
  //게시글 작성 모달 상태
  const [openBoardPost, setOpenBoardPost] = useState<boolean>(false);
  //게시글 작성완료시 유형별 게시판페이지로 이동
  const nav = useNavigate();
  const goDetailPage = (mbti: string): void => {
    nav(`/board/${mbti}`);
    getPostings();
  };
  const showModal = (id: string): void => {
    setSelectedId(id);
    setOpenCardModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = (): void => {
    setOpenCardModal(false);
    getPostings();
    document.body.style.overflow = "unset";
  };

  //게시글 작성 날짜 양식-> *일 전으로 변경
  const calculateDaysDiff = (date: Date): number => {
    //서버 저장되는 시간이 (한국표준시Z)의 형태임
    //Date()를 거치면 원래는 UTC -> local시간으로 되는 건데
    //한국표준시를 인자로 넣었기 때문에 한국표준시보다 +9시간 차이가 나게 된다.
    //리팩토링 시 서버에 저장되는 시간을 UTC로 바꾸면 메서드의 용도에 맞고 이해가 쉬울 듯 하다.
    const pastDate: Date = new Date(date); //local(한국표준시 +9시간)
    const currentDate: Date = new Date(); //local(한국표준시)

    //local시간 ->UTC로 바꾸는 명령어 :한국표준시 -9시간
    const pastLocalDate = pastDate.getUTCDate(); //작성시 local(한국표준시)
    const currentLocalDate = currentDate.getDate(); //현재 local(한국표준시)

    const diffInDate: number = currentLocalDate - pastLocalDate;

    // console.log("서버시간", date);
    // console.log("작성날짜", pastDate, pastLocalDate);
    // console.log("현재날짜", currentDate, currentLocalDate);
    // console.log("날짜 차이", diffInDate);

    return diffInDate;
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
  const [mbtiType, setMbtiType] = useState<string[]>(["I", "N", "F", "P"]);
  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );
  const handleThisConfirm = () => {
    const mbti = mbtiType.reduce((acc, cur) => acc + cur);
    setOpenMbtiModal(false);
    setOnDetailPage(true);
    goDetailPage(mbti);
  };

  //Detail 페이지에 필요한 변수,메소드

  //파라미터 :mbti 가져오기
  const { mbti } = useParams() as { mbti: string };

  //파라미터로 mbti가 전달되자마자 게시글 데이터 업데이트
  useEffect(() => {
    getPostings();
  }, [mbti]);

  //유형별게시판과 전체게시판 구분
  const [onDetailPage, setOnDetailPage] = useState<boolean>(false);
  useEffect(() => {
    if (mbti) {
      setOnDetailPage(true);
    } else {
      setOnDetailPage(false);
    }
  }, []);

  //전체 게시글
  const boardAll = postings.map((posting) => {
    return (
      <BulletinCard
        key={posting._id}
        id={posting._id}
        showModal={showModal}
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
          showModal={showModal}
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
            setOnDetailPage(true);
            goDetailPage(mbti);
          }}
          thisMbti={mbti ? mbti : "INFP"}
        />
      ) : (
        <BoardDiv>
          {openCardModal && (
            <BulletinCardModal
              selectedId={selectedId}
              closeModal={closeModal}
            />
          )}
          {openMbtiModal && (
            <div>
              <ModalBg onClick={() => setOpenMbtiModal(false)} />
              <MbtiTypesModal
                selectMbti={mbtiType}
                onThisMbti={handleThisMbti}
                isButton={true}
                onThisConfirm={handleThisConfirm}
              />
            </div>
          )}
          <Header>
            {mbti ? (
              <MbtiTitle>
                <Title>{mbti}</Title>
                <MbtiColorChip selectedMbti={mbti} />
              </MbtiTitle>
            ) : (
              <Title>MBTI 담벼락</Title>
            )}
            <ChangeMbtiBtn setOpenMbtiModal={setOpenMbtiModal} />
          </Header>
          <Main>
            <BulletinCardWrap>{mbti ? boardDetail : boardAll}</BulletinCardWrap>
          </Main>
          <Footer>
            <PostBtn setOpenBoardPost={setOpenBoardPost} />
          </Footer>
        </BoardDiv>
      )}
    </>
  );
}
