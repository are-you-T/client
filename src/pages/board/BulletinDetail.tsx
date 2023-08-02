import React, { useState } from "react";
import tw from "tailwind-styled-components";

import BulletinCard from "@/components/board/BulletinCard";
import BulletinCardModal from "@/components/board/BulletinCardModal";
import MbtiColorChip from "@/components/board/MbtiColorChip";
import PostBtn from "@/components/board/PostBtn";

const Board = tw.div`
  flex flex-col
  h-screen w-[390px] bg-black
  px-[17px] mx-auto
`;
const Header = tw.div`
flex flex-row justify-between items-center
mt-4 mb-7 
`;
const Mbti = tw.div`
 flex flex-row items-center gap-3
`;
const Title = tw.div`
text-[43px] leading-[51px] font-bold text-white
`;
const ChangeMbtiBtn = tw.button`
  
`;

const Main = tw.div`
  w-full overflow-auto
`;
const BulletinCardWrap = tw.div`
  flex flex-wrap justify-start gap-[15px]
  w-fit mx-auto
`;

const Footer = tw.div`
  flex justify-center
  w-full bg-black
  self-end
  pt-3 pb-3
`;

//@ts-ignore
export default function BulletinBoard() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Board>
      {openModal && <BulletinCardModal closeModal={closeModal} />}
      <Header>
        <Mbti>
          <Title>INTJ</Title>

          <MbtiColorChip />
        </Mbti>
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
        <BulletinCardWrap></BulletinCardWrap>
      </Main>

      <Footer>
        <PostBtn />
      </Footer>
    </Board>
  );
}
