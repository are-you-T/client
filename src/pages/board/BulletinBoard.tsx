import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import axios from "axios";

import BulletinCard from "@/components/board/BulletinCard";
import BulletinCardModal from "@/components/board/BulletinCardModal";

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
const Title = tw.div`
  text-[43px] leading-[51px]  font-bold text-white
`;
const ChangeMbtiBtn = tw.button`
  
`;
const Main = tw.div`
  w-full overflow-auto
`;
const BulletinCardWrap = tw.div`
  flex flex-wrap justify-start gap-[15px]
  mx-auto
`;
const PostBtn = tw.button`
`;
const Footer = tw.div`
  flex justify-center
  w-full bg-black
  self-end
  pt-3 pb-3
  absolute bottom-0 left-0 right-0
`;

//@ts-ignore
export default function BulletinBoard() {
  // 모달창 제어 기능
  const [openModal, setOpenModal] = useState(false);
  //선택한 카드의 id값
  const [selectedId, setSelectedId] = useState("");
  //@ts-ignore
  const showModal = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const [postings, setPostings] = useState<Posting[]>([]);
  //게시글 작성 날짜 -> *일 전으로 변경
  //@ts-ignore
  const calculateDaysDiff = (dateString) => {
    const pastDate = new Date(dateString);
    const currentDate = new Date();

    pastDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    //@ts-ignore
    const diffInMilliseconds = currentDate - pastDate;
    const days = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return days === 1 ? "1" : `${days}`;
  };
  //게시글 타입
  type Posting = {
    _id: string;
    title: string;
    content: string;
    category: string;
    like: number;
    createdAt: string;
  };
  //게시글 불러오기
  useEffect(() => {
    getBoard();
  }, []);
  async function getBoard() {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/board");

      console.log("response.data.data", response.data.data);
      setPostings(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Board>
      {openModal && (
        <BulletinCardModal selectedId={selectedId} closeModal={closeModal} />
      )}
      <Header>
        <Title>MBTI 담벼락</Title>
        {/* change icon */}
        <ChangeMbtiBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="47"
            fill="none"
          >
            <ellipse
              cx="23.536"
              cy="23.204"
              fill="#00B26E"
              rx="23.536"
              ry="23.204"
            />
            <path
              fill="#000"
              d="M19.024 18.303a6.762 6.762 0 0 1 9.523-.042l-1.741 1.737a1.016 1.016 0 0 0 .718 1.733H32.935c.562 0 1.014-.452 1.014-1.014v-5.41a1.016 1.016 0 0 0-1.733-.719l-1.758 1.758c-3.703-3.656-9.667-3.643-13.348.043a9.414 9.414 0 0 0-2.232 3.542 1.352 1.352 0 0 0 2.549.9 6.694 6.694 0 0 1 1.598-2.528Zm-5.363 7.148v5.41a1.016 1.016 0 0 0 1.733.718l1.758-1.758c3.703 3.656 9.667 3.644 13.348-.042a9.443 9.443 0 0 0 2.236-3.538 1.352 1.352 0 0 0-2.549-.9 6.693 6.693 0 0 1-1.597 2.527 6.762 6.762 0 0 1-9.523.043l1.737-1.742a1.016 1.016 0 0 0-.719-1.733h-5.41c-.562 0-1.014.453-1.014 1.015Z"
            />
          </svg>
        </ChangeMbtiBtn>
      </Header>
      <Main>
        <BulletinCardWrap>
          {postings.map((posting) => {
            return (
              <BulletinCard
                key={posting._id}
                id={posting._id}
                showModal={showModal}
                title={posting.title}
                content={posting.content}
                category={posting.category}
                like={posting.like}
                createdAt={calculateDaysDiff(posting.createdAt)}
              />
            );
          })}
        </BulletinCardWrap>
      </Main>
      <Footer>
        {/* post button icon */}
        <PostBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="47"
            fill="none"
          >
            <circle cx="23.5" cy="23.5" r="23.5" fill="#fff" />
            <path
              fill="#000"
              d="M21.913 35.217v-9.473H12.49V22.57h9.424v-9.424h3.174v9.424h9.473v3.174h-9.473v9.473h-3.174Z"
            />
          </svg>
        </PostBtn>
      </Footer>
    </Board>
  );
}
