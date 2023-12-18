import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInfiniteScroll from "@/hooks/useInfinitiScroll";

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

  // 무한스크롤 => count : 불러오는 데이터 갯수 , skipCount : 생략하는 데이터 갯수
  const [count, setCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  // 무한스크롤 => 더 불러올 데이터가 없을 때 skipCount 상태의 증가를 막기 위한 state
  const [disableLoadData, setDisableLoadDate] = useState(false);
  // 임시 : isLoading 넣어서 true일때만 무한스크롤 호출
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 get 요청
  async function getPostings() {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const response = await axiosRequest.requestAxios<ResData<Board[]>>(
        "get",
        mbti
          ? `/board/${mbti}?count=${count}&skipCount=${skipCount}`
          : `/board/?count=${count}&skipCount=${skipCount}`
      );

      // 더 불러올 데이터가 없어서 빈배열일 때
      if (!response.data.length) {
        setDisableLoadDate(true);
        return;
      }
      // 데이터 이전 값에 현재 값을 더함
      setPostings((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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

  // 파라미터로 mbti가 전달되자마자 게시글 데이터 업데이트
  // skipCount 과 mbti 값이 변경될 때마다 데이터 호출
  useEffect(() => {
    getPostings();
    console.log("임시");
  }, [mbti, skipCount]);

  // 무한 스크롤 훅
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = () => {
    if (disableLoadData || !isLoading) return;
    setSkipCount((prev) => prev + 10);
    // console.log(skipCount, "skipCount");
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [skipCount, mbti]);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  //전체 게시글
  // const boardAll = postings.map((posting) => {
  //   return (
  //     <BulletinCard
  //       key={posting._id}
  //       id={posting._id}
  //       handleCardClick={handleCardClick}
  //       title={posting.title}
  //       content={posting.content}
  //       category={posting.category}
  //       color={posting.color}
  //       like={posting.like}
  //       createdAt={calculateDaysDiff(posting.createdAt)}
  //     />
  //   );
  // });
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
            setSkipCount(0); // skipCount를 0으로 초기화시킴으로써 새로 재조회
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
            <BulletinCardWrap>
              {mbti
                ? boardDetail
                : postings.map((posting, index) => (
                    <BulletinCard
                      key={posting._id + index}
                      id={posting._id}
                      handleCardClick={handleCardClick}
                      title={posting.title}
                      content={posting.content}
                      category={posting.category}
                      color={posting.color}
                      like={posting.like}
                      createdAt={calculateDaysDiff(posting.createdAt)}
                    />
                  ))}
              <div
                ref={observerRef}
                style={{
                  height: "5px",
                  width: "100%",
                  border: "none"
                }}
              />
            </BulletinCardWrap>
          </Main>
        </BoardDiv>
      )}
    </>
  );
}
