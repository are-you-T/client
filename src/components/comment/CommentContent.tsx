import { useEffect, useState } from "react";
import {
  CommentContentWrap,
  CommentContenBox,
  CommentContenDetail,
  CommentModalBg,
  RepliesCharacter,
  CommentContentOption,
  CommentContentText
} from "@/components/comment/CommentContent.styles";
import { CommentEditPassWord } from "@/components/comment/CommentEditPassWord";
import { ReactComponent as Setting } from "@/assets/img/comment_setting.svg";
import CommentCharacter from "@/components/common/CommentCharacter";
import axiosRequest from "@/api";
import { ResData, Comment, CommentPostData } from "@/@types";
import CommentHeartBtn from "../board/Button/HeartBtn/CommentHeartBtn";
import {
  CommentEditBottom,
  CommentEditBottomDetail,
  CommentEditBox,
  CommentEditTop,
  CommentEditWrap
} from "./CommentEdit.styles";
import {
  CommentCharacterModalBg,
  CommentCharacterWrap
} from "./CommentPost.styles";
import AlertModal from "../common/AlertModal/AlertModal";

interface BoardIdProps {
  boardId: string;
  _id?: string;
}
export function CommentContent({ boardId, _id }: BoardIdProps) {
  //모달
  const [showModal, setShowModal] = useState<string>("");

  //댓글
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentId, setCommentId] = useState<string>("");

  //대댓글
  const [isReplying, setIsReplying] = useState<boolean>(false);

  //대댓글 에러타입
  const [errorType, setErrorType] = useState<string>("");

  //대댓글 프로필 캐릭터 색상
  const [selectedCharacterColor, setSelectedCharacterColor] =
    useState<string>("#B2ACF9");
  const [newComment, setNewComment] = useState<{
    content: string;
    password: string;
  }>({ content: "", password: "" });

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = (_id: string) => {
    setShowModal("CommentEditModal");
    setCommentId(_id);
    console.log(_id);
  };
  const handleCloseModal = () => {
    setShowModal("");
  };

  // 댓글 전체 조회
  async function getComment() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment[]>>(
        "get",
        `/comment/${boardId}`
      );
      const data: Comment[] = stairComment(response.data);

      setComments(data);
      console.log("댓글 전체", data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComment();
  }, []);
  /**
   * 계층형으로 코멘트 배열 반환
   * @param commentData
   * @returns
   */
  const stairComment = (commentData: Comment[]) => {
    const comments: Comment[] = [];
    commentData.forEach((comment) => {
      if (comment.depthCommentId) {
        const parentComment: Comment | undefined = commentData.find(
          (item) => item._id === comment.depthCommentId
        );
        if (parentComment) {
          if (!parentComment.replies) {
            parentComment.replies = [];
          }
          parentComment.replies.push(comment);
        }
      } else {
        comments.push(comment);
      }
    });
    return comments;
  };

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

  //댓글 삭제
  async function handleDeleteClick(_id: string) {
    try {
      await axiosRequest.requestAxios<ResData<Comment>>(
        "delete",
        `/comment/${_id}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.boardId !== comment._id)
      );
      getComment();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  }
  //댓글 데이터 넘겨주기
  function getInitialComment(commentId: string) {
    console.log(comments);
    const comment = comments.find((comment) => comment._id === commentId);
    if (comment) {
      return {
        content: comment.content,
        password: comment.password,
        color: comment.color
      };
    }
    //대댓글
    const foundComment = comments.find(
      (comment) =>
        comment.replies &&
        comment.replies.some((reply) => reply._id === commentId)
    );
    console.log(foundComment);
    if (foundComment?.replies) {
      const foundReply = foundComment.replies.find(
        (reply) => reply._id === commentId
      );
      console.log(foundReply);
      return {
        content: foundReply?.content,
        password: foundReply?.password,
        color: foundReply?.color
      };
    }

    // 찾을 수 없는 경우 기본값 반환
    return {
      content: "",
      password: "",
      color: ""
    };
  }

  //대댓글 작성 모달
  const handleReplyClick = (_id: string) => {
    setCommentId(_id);
    setIsReplying(true);
  };

  // 댓글 캐릭터
  function CommentCharacterSelector({
    selectCharacterColor,
    onCharacterColorChange
  }: {
    selectCharacterColor: string;
    onCharacterColorChange: (color: string) => void;
  }) {
    const handleCharacterClick = (color: string) => {
      onCharacterColorChange(color);
    };
    return (
      <CommentCharacterWrap>
        <button onClick={() => handleCharacterClick("#B2ACF9")}>
          <CommentCharacter bgColor={"#B2ACF9"} />
        </button>

        <button onClick={() => handleCharacterClick("#FFDE3F")}>
          <CommentCharacter bgColor={"#FFDE3F"} />
        </button>
        <button onClick={() => handleCharacterClick("#EFC7D6")}>
          <CommentCharacter bgColor={"#EFC7D6"} />
        </button>
        <button onClick={() => handleCharacterClick("#9FEEA2")}>
          <CommentCharacter bgColor={"#9FEEA2"} />
        </button>
        <button onClick={() => handleCharacterClick("#78D9EE")}>
          <CommentCharacter bgColor={"#78D9EE"} />
        </button>
        <button onClick={() => handleCharacterClick("#FF9D42")}>
          <CommentCharacter bgColor={"#FF9D42"} />
        </button>
      </CommentCharacterWrap>
    );
  }
  //대댓글 등록 api
  async function postReplyData() {
    const { content, password } = newComment;

    try {
      const response = await axiosRequest.requestAxios<
        ResData<CommentPostData>
      >("post", "/comment", {
        boardId: boardId,
        depthCommentId: commentId,
        password: password,
        content: content,
        color: selectedCharacterColor
      });
      getComment();
      console.log("댓글성공", commentId);
    } catch (error) {
      console.error(error);
    }
  }
  // 대댓글유효성 검사
  const handleReplySubmit = () => {
    const { content, password } = newComment;

    if (content === "") {
      setErrorType("댓글을 입력해주세요!");
      setShowModal("AlertModal");
      return;
    } else if (password === "") {
      setErrorType("비밀번호를 입력해주세요!");
      setShowModal("AlertModal");
      return;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorType("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setShowModal("AlertModal");
      return;
    }

    console.log("댓글 데이터:", newComment);
    console.log("선택된 색상:", selectedCharacterColor);
    setErrorType("");
    postReplyData();
    setIsReplying(false);
  };
  //대댓글 캐릭터 모달
  const handleCharacterModal = () => {
    setShowModal(showModal === "CharacterModal" ? "" : "CharacterModal");
  };
  //대댓글 캐릭터 색상변경
  const handleCharacterColorChange = (color: string) => {
    setSelectedCharacterColor(color);
    setNewComment((prevComment) => {
      return {
        ...prevComment,
        color: color
      };
    });
    setShowModal("");
  };
  //내용 글자수 제한

  const toggleEllipsis = (str: string, limit: number) => {
    const strToArr = Array.from(str);
    if (strToArr.length > limit) {
      return strToArr.slice(0, limit).join("") + "...";
    } else {
      return str;
    }
  };
  return (
    <div style={{ border: "none" }}>
      <CommentContentWrap>
        {comments.map((comment) => (
          <>
            <CommentContenBox key={comment._id}>
              <CommentCharacter bgColor={comment.color} />
              <CommentContentText>
                <div>{toggleEllipsis(comment.content, 15)}</div>
                <CommentContenDetail>
                  <button onClick={() => handleReplyClick(comment._id)}>
                    댓글달기
                  </button>
                  <div>{changeDateFormat(new Date(comment.createdAt))}</div>
                </CommentContenDetail>
              </CommentContentText>
              <CommentContentOption>
                <CommentHeartBtn id={comment._id} like={comment.like} />
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
                          console.log(showModal);
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
              </CommentContentOption>
            </CommentContenBox>
            {comment.replies &&
              comment.replies.map((replyComment) => (
                <CommentContenBox key={replyComment._id}>
                  <RepliesCharacter>
                    <CommentCharacter bgColor={replyComment.color} />
                  </RepliesCharacter>
                  <CommentContentText>
                    <div>{toggleEllipsis(replyComment.content, 15)}</div>
                    <CommentContenDetail>
                      <div>
                        {changeDateFormat(new Date(replyComment.createdAt))}
                      </div>
                    </CommentContenDetail>
                  </CommentContentText>
                  {/* 댓글 아이디로 변경해야함 */}
                  <CommentHeartBtn
                    id={replyComment._id}
                    like={replyComment.like}
                  />
                  <div className="dropdown dropdown-end">
                    <Setting tabIndex={0} className="m-1"></Setting>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow rounded-box w-[120px] bg-white text-black"
                    >
                      <li>
                        <button
                          onClick={() => {
                            handleEditClick(replyComment._id);
                            console.log(replyComment._id);
                          }}
                        >
                          수정
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDeleteClick(replyComment._id)}
                        >
                          삭제
                        </button>
                      </li>
                    </ul>
                  </div>
                </CommentContenBox>
              ))}
          </>
        ))}

        {isReplying !== false && (
          <>
            <CommentModalBg onClick={() => setIsReplying(false)} />
            <CommentEditWrap>
              <CommentEditBox>
                <CommentEditTop>
                  <button onClick={handleCharacterModal}>
                    <CommentCharacter bgColor={selectedCharacterColor} />
                  </button>
                  <input
                    type="text"
                    placeholder="댓글 달기"
                    className="w-[80%] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
                    onChange={(evt) => {
                      setNewComment((post) => {
                        return { ...post, content: evt.target.value };
                      });
                    }}
                  />
                </CommentEditTop>
                <CommentEditBottom>
                  <p>비밀번호</p>
                  <CommentEditBottomDetail>
                    <input
                      type="password"
                      placeholder="비밀번호 입력"
                      value={newComment.password}
                      className="w-[50%]  h-[30px] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
                      onChange={(evt) => {
                        setNewComment((post) => {
                          return { ...post, password: evt.target.value };
                        });
                      }}
                    />
                    <button
                      type="submit"
                      onClick={handleReplySubmit}
                      className="w-[30%] h-[30px] bg-black rounded-[10px] text-white text-[14px]"
                    >
                      등록
                    </button>
                  </CommentEditBottomDetail>
                </CommentEditBottom>
              </CommentEditBox>
              {showModal !== "" && (
                <>
                  <CommentCharacterModalBg
                    onClick={() => setIsReplying(false)}
                  />
                  {showModal === "CharacterModal" && (
                    <CommentCharacterSelector
                      selectCharacterColor={selectedCharacterColor}
                      onCharacterColorChange={handleCharacterColorChange}
                    />
                  )}
                  {showModal === "AlertModal" && (
                    <AlertModal
                      error={errorType}
                      onClose={() => setShowModal("")}
                    />
                  )}
                </>
              )}
            </CommentEditWrap>
          </>
        )}
        {showModal !== "" && (
          <>
            {showModal === "CommentEditModal" && (
              <CommentEditPassWord
                onClose={handleCloseModal}
                _id={commentId}
                initialComment={getInitialComment(commentId)}
              />
            )}
          </>
        )}
      </CommentContentWrap>
    </div>
  );
}
