import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import axiosRequest from "@/api/index";
import { resData, board } from "@/interfaces/index";

import BulletinCard from "@/components/board/BulletinCard";
import BulletinCardModal from "@/components/board/BulletinCardModal";
import MbtiColorChip from "@/components/board/MbtiColorChip";
import PostBtn from "@/components/board/PostBtn";
import ChangeMbtiBtn from "@/components/board/ChangeMbtiBtn";
import BoardPost from "@/components/board/BoardPost";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";
import colorData from "@/constants/bgColor";

const Board = tw.div`
  flex flex-col
  h-screen w-[390px] bg-black
  px-[17px] mx-auto
  relative
`;
const Header = tw.div`
  flex flex-row justify-between items-center
  mt-4 mb-7
`;
const Mbti = tw.div`
 flex flex-row items-center gap-3
`;
const Title = tw.div`
  text-[43px] leading-[51px]  font-bold text-white
`;

const Main = tw.div`
  w-full overflow-auto
  pb-[71px]
`;
const BulletinCardWrap = tw.div`
  flex flex-wrap justify-start gap-[15px]
  mx-auto
`;

const Footer = tw.div`
  flex justify-center
  w-full bg-black
  self-end
  pt-3 pb-3
  absolute bottom-0 left-0 right-0
`;

export default function BulletinDetail() {
  // 모달창 상태
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openMbtiModal, setOpenMbtiModal] = useState<boolean>(false);
  //선택한 카드의 id값
  const [selectedId, setSelectedId] = useState<string>("");
  //선택한 카드의 좋아요수

  //전체 게시글
  const [postings, setPostings] = useState<board[]>([]);
  //게시글 작성 모달 상태
  const [openBoardPost, setOpenBoardPost] = useState<boolean>(false);
  //게시글 작성완료시 유형별 게시판페이지로 이동
  const nav = useNavigate();
  const goToMbtiPage = (mbti: string): void => {
    nav(`/board/${mbti}`);
  };
  const showModal = (id: string, like: number): void => {
    setSelectedId(id);
    setOpenModal(true);
  };
  const closeModal = (): void => {
    setOpenModal(false);
  };

  //게시글 작성 날짜 양식-> *일 전으로 변경
  const calculateDaysDiff = (dateString: Date): string => {
    const pastDate: Date = new Date(dateString);
    const currentDate: Date = new Date();

    pastDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const diffInMilliseconds: number = Number(currentDate) - Number(pastDate);
    const days: number = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return days === 1 ? "1" : `${days}`;
  };

  async function getPostings() {
    try {
      const response: resData<board[]> = await axiosRequest.requestAxios<
        resData<board[]>
      >("get", `/board/${mbti}`);
      console.log("전체게시글", response.data);
      setPostings(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //파라미터 :mbti 가져오기
  let { mbti } = useParams() as { mbti: string };

  let selectedMbti: string = mbti.toUpperCase();
  // console.log(selectedMbti);

  useEffect(() => {
    getPostings();
    // console.log("params", mbti, selectedMbti);
  }, []);

  return (
    <>
      {openBoardPost ? (
        <BoardPost
          onThisClose={() => setOpenBoardPost(false)}
          onThisComplete={(mbti) => {
            goToMbtiPage(mbti);
          }}
          thisMbti={mbti}
        />
      ) : (
        <Board>
          {openModal && (
            <BulletinCardModal
              selectedId={selectedId}
              closeModal={closeModal}
            />
          )}
          {openMbtiModal && (
            <MbtiTypesModal
              selectMbti={["I", "N", "T", "J"]}
              onThisMbti={() => console.log("dd")}
              isButton={true}
            />
          )}
          <Header>
            <Mbti>
              <Title>{selectedMbti}</Title>
              <MbtiColorChip selectedMbti={selectedMbti} />
            </Mbti>
            <ChangeMbtiBtn setOpenMbtiModal={setOpenMbtiModal} />
          </Header>
          <Main>
            <BulletinCardWrap>
              {postings
                .filter((posting) => posting.category === selectedMbti)
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
                })}
            </BulletinCardWrap>
          </Main>
          <Footer>
            <PostBtn setOpenBoardPost={setOpenBoardPost} />
          </Footer>
        </Board>
      )}
    </>
  );
}
