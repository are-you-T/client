import { useEffect, useState } from "react";
import {
  CommentModalBg,
  CommentContentWrap,
  CommentContenBox,
  CommentContenDetail
} from "@/components/comment/CommentContent.styles";
import { CommentEdit } from "@/components/comment/CommentEdit";
import { ReactComponent as Setting } from "@/assets/img/comment_setting.svg";
import CommentCharacter from "@/components/common/CommentCharacter";
import axiosRequest from "@/api";
import { ResData, Comment } from "@/@types";
import HeartBtn from "../board/Button/HeartBtn/HeartBtn";

interface BoardIdProps {
  boardId: string;
}
export function CommentContent({ boardId }: BoardIdProps) {
  const [showModal, setShowModal] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentId, setCommentId] = useState<string>("");

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = (_id: string) => {
    setShowModal("CommentEditModal");
    setCommentId(_id);
  };

  // 댓글 전체 조회
  async function getComment() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment[]>>(
        "get",
        `/comment/${boardId}`
      );
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log("아이디", boardId);
    }
  }
  useEffect(() => {
    getComment();
  }, []);

  //날짜 양식 맞추기
  const twoStringFormat = (date: number): string => {
    return date < 10 ? "0" + date.toString() : date.toString();
  };
  const changeDateFormat = (date: Date): string => {
    if (date) {
      const localDate = new Date(date);
      // console.log("연도", localDate.getFullYear());
      // console.log("월", localDate.getMonth() + 1);
      // console.log("일", localDate.getDate());
      const year = localDate.getFullYear().toString();
      const month = twoStringFormat(localDate.getMonth() + 1);
      const day = twoStringFormat(localDate.getDate());

      return `${year}.${month}.${day}`;
    }
    return "";
  };

  async function handleDeleteClick(_id: string) {
    try {
      await axiosRequest.requestAxios<ResData<Comment>>(
        "delete",
        `/comment/${_id}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.boardId !== comment._id)
      );
      console.log("댓글삭제 아이디", _id);
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  }

  return (
    <>
      <CommentContentWrap>
        {comments.map((comment) => (
          <CommentContenBox key={comment.boardId}>
            <CommentCharacter bgColor={comment.color} />
            <div>
              <div>{comment.content}</div>
              <CommentContenDetail>
                <button>댓글달기</button>
                <div>{changeDateFormat(new Date(comment.createdAt))}</div>
              </CommentContenDetail>
            </div>
            {/* 댓글 아이디로 변경해야함 */}
            <HeartBtn id={boardId} like={comment.like} />

            <div className="dropdown dropdown-end">
              <Setting tabIndex={0} className="m-1"></Setting>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow rounded-box w-[120px] bg-white text-black"
              >
                <li>
                  <button
                    onClick={() => {
                      handleEditClick(comment._id);
                    }}
                  >
                    수정
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDeleteClick(comment._id)}>
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          </CommentContenBox>
        ))}

        {showModal !== "" && (
          <>
            <CommentModalBg onClick={() => setShowModal("")} />
            {showModal === "CommentEditModal" && (
              <CommentEdit onClose={() => setShowModal("")} _id={commentId} />
            )}
          </>
        )}
      </CommentContentWrap>
    </>
  );
}
