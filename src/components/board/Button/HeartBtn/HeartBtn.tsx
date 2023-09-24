import { useState, useEffect } from "react";
import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

import { Heart, HeartIcon, HeartCount } from "./HeartBtn.styles";

interface HeartBtnProps {
  id: string;
  like: number;
}
export default function HeartBtn({ id, like }: HeartBtnProps) {
  //좋아요수 상태
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    setLikeCount(like);
  }, [like]);

  //좋아요 처리 api
  async function increaseLikeCount() {
    try {
      const response: ResData<Board> = await axiosRequest.requestAxios<
        ResData<Board>
      >("patch", `/board/post/${id}`);
      // console.log("좋아요", response.data);
      setLikeCount(response.data.like);
    } catch (error) {
      console.error(error);
    }
  }
  //하트 클릭시 좋아요수 증가시키는 함수
  const handleHeartClick = async () => {
    // console.log("클릭됨");
    await increaseLikeCount();
  };
  return (
    <Heart>
      <HeartIcon
        onClick={() => {
          handleHeartClick();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          fill="#FC5013"
        >
          <path
            stroke="#FC5013"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M4.5 1C2.567 1 1 2.491 1 4.33c0 1.486.613 5.01 6.642 8.573a.71.71 0 0 0 .716 0C14.388 9.34 15 5.816 15 4.331 15 2.49 13.433 1 11.5 1S8 3.019 8 3.019 6.433 1 4.5 1Z"
          />
        </svg>
      </HeartIcon>
      <HeartCount>{likeCount}</HeartCount>
    </Heart>
  );
}
