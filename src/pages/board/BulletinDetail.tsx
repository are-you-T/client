// import React, { useState } from "react";
// import tw from "tailwind-styled-components";

// import BulletinCard from "@/components/board/BulletinCard";
// import BulletinCardModal from "@/components/board/BulletinCardModal";
// import MbtiColorChip from "@/components/board/MbtiColorChip";
// import PostBtn from "@/components/board/PostBtn";

// const Board = tw.div`
//   flex flex-col
//   h-screen w-[390px] bg-black
//   px-[17px] mx-auto
// `;
// const Header = tw.div`
// flex flex-row justify-between items-center
// mt-4 mb-7
// `;
// const Mbti = tw.div`
//  flex flex-row items-center gap-3
// `;
// const Title = tw.div`
// text-[43px] leading-[51px] font-bold text-white
// `;
// const ChangeMbtiBtn = tw.button`

// `;

// const Main = tw.div`
//   w-full overflow-auto
// `;
// const BulletinCardWrap = tw.div`
//   flex flex-wrap justify-start gap-[15px]
//   w-fit mx-auto
// `;

// const Footer = tw.div`
//   flex justify-center
//   w-full bg-black
//   self-end
//   pt-3 pb-3
// `;

// //@ts-ignore
// export default function BulletinBoard() {
//   const [openModal, setOpenModal] = useState(false);
//   const showModal = () => {
//     setOpenModal(true);
//   };
//   const closeModal = () => {
//     setOpenModal(false);
//   };
//   return (
//     <Board>
//       {/* {openModal && <BulletinCardModal closeModal={closeModal} />} */}
//       <Header>
//         <Mbti>
//           <Title>INTJ</Title>

//           <MbtiColorChip />
//         </Mbti>
//         {/* change icon */}
//         <ChangeMbtiBtn>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="48"
//             height="47"
//             fill="none"
//           >
//             <ellipse
//               cx="23.536"
//               cy="23.204"
//               fill="#00B26E"
//               rx="23.536"
//               ry="23.204"
//             />
//             <path
//               fill="#000"
//               d="M19.024 18.303a6.762 6.762 0 0 1 9.523-.042l-1.741 1.737a1.016 1.016 0 0 0 .718 1.733H32.935c.562 0 1.014-.452 1.014-1.014v-5.41a1.016 1.016 0 0 0-1.733-.719l-1.758 1.758c-3.703-3.656-9.667-3.643-13.348.043a9.414 9.414 0 0 0-2.232 3.542 1.352 1.352 0 0 0 2.549.9 6.694 6.694 0 0 1 1.598-2.528Zm-5.363 7.148v5.41a1.016 1.016 0 0 0 1.733.718l1.758-1.758c3.703 3.656 9.667 3.644 13.348-.042a9.443 9.443 0 0 0 2.236-3.538 1.352 1.352 0 0 0-2.549-.9 6.693 6.693 0 0 1-1.597 2.527 6.762 6.762 0 0 1-9.523.043l1.737-1.742a1.016 1.016 0 0 0-.719-1.733h-5.41c-.562 0-1.014.453-1.014 1.015Z"
//             />
//           </svg>
//         </ChangeMbtiBtn>
//       </Header>
//       <Main>
//         <BulletinCardWrap></BulletinCardWrap>
//       </Main>

//       <Footer>{/* <PostBtn /> */}</Footer>
//     </Board>
//   );
// }
//-----------
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import axiosRequest from "@/api/index";
import { resData, board } from "@/interfaces/index";

import BulletinCard from "@/components/board/BulletinCard";
import BulletinCardModal from "@/components/board/BulletinCardModal";
import PostBtn from "@/components/board/PostBtn";
import ChangeMbtiBtn from "@/components/board/ChangeMbtiBtn";
import BoardPost from "@/components/board/BoardPost";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";

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
  const [mbtiTypesModal, setMbtiTypesModal] = useState<boolean>(false);
  //선택한 카드의 id값
  const [selectedId, setSelectedId] = useState<string>("");
  //선택한 카드의 좋아요수
  const [selectedlike, setSelectedLike] = useState<number>(0);
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
    setSelectedLike(like);
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
      >("get", "/board");
      // console.log("전체게시글", response.data);
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
        />
      ) : (
        <Board>
          {openModal && (
            <BulletinCardModal
              selectedId={selectedId}
              selectedLike={selectedlike}
              closeModal={closeModal}
            />
          )}
          {mbtiTypesModal && (
            <MbtiTypesModal
              selectMbti={["I", "N", "T", "J"]}
              onThisMbti={() => console.log("dd")}
              isButton={true}
            />
          )}
          <Header>
            <Title>MBTI 담벼락</Title>
            <ChangeMbtiBtn setMbtiTypesModal={setMbtiTypesModal} />
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
