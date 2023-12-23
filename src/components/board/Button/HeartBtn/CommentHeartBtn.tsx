import { useState, useEffect } from "react";

import axiosRequest from "@/api/index";
import { ResData, Comment } from "@/@types/index";

import { Heart, HeartIcon, HeartCount } from "./HeartBtn.styles";
import { ReactComponent as HeartButtonSvg } from "@/assets/img/heart_button.svg";

interface HeartBtnProps {
  id: string;
  like: number;
}
export default function CommentHeartBtn({ id, like }: HeartBtnProps) {
  //좋아요수 상태
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    setLikeCount(like);
  }, [like]);

  //좋아요 처리 api
  async function increaseLikeCount() {
    try {
      const response: ResData<Comment> = await axiosRequest.requestAxios<
        ResData<Comment>
      >("patch", `/comment/post/${id}`);
      // console.log("아이디값", id);
      // console.log("좋아요", response.data);
      setLikeCount(response.data.like);
    } catch (error) {
      // console.log("클릭 데이터", id);
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
        <HeartButtonSvg />
      </HeartIcon>
      <HeartCount>{likeCount}</HeartCount>
    </Heart>
  );
}
