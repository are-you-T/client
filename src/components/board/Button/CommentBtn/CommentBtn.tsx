import { useState, useEffect } from "react";

import axiosRequest from "@/api/index";
import { ResData, Comment } from "@/@types/index";

import { ReactComponent as CommentIcon } from "@/assets/img/comment.svg";
import {
  CommentIconWrap,
  CommentNumber,
  CommentWrap
} from "./CommentBtn.styles";

interface CommentBtnProps {
  id: string;
  onClick: (id: string) => void;
}
export default function CommentBtn({ id, onClick }: CommentBtnProps) {
  //댓글 숫자 상태
  const [commentNumber, setCommentNumber] = useState<number>(0);

  useEffect(() => {
    getCommentNumber();
  }, []);

  //좋아요 처리 api
  async function getCommentNumber() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment[]>>(
        "get",
        `/comment/${id}`
      );

      setCommentNumber(response.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CommentWrap onClick={() => onClick(id)}>
      <CommentIconWrap>
        <CommentIcon />
      </CommentIconWrap>
      <CommentNumber>{commentNumber}</CommentNumber>
    </CommentWrap>
  );
}
