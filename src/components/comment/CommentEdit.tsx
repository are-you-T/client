import { ReactNode, useState } from "react";
import axiosRequest from "@/api";
import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import {
  CommentEditWrap,
  CommentEditBox,
  CommentEditTop,
  CommentEditBottom,
  CommentEditBottomDetail,
  CommentCharacterWrap,
  CommentCharacterModalBg
} from "@/components/comment/CommentEdit.styles";
import { ResData, CommentEditProps } from "@/@types";
import { CommentModalBg } from "./CommentContent.styles";
import { ModalBg } from "../common/MbtiTypesModal/MbtiTypesModal.styles";
import { ModalWrapCenter } from "../board/BoardPost/BoardPost.styles";
import CommentCharacter from "@/components/common/CommentCharacter";

// 모달 배경 닫기(MbtiTypesModal은 제외)
function ModalClose({
  children,
  onClose
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <ModalBg onClick={handleModalBgClick}>{children}</ModalBg>;
}

// 유효성 결과 모달
function AlertModal({
  error,
  onClose
}: {
  error: string;
  onClose: () => void;
}) {
  return (
    <ModalClose onClose={onClose}>
      <ModalWrapCenter>
        <h3 className="text-xl font-black text-center flex items-center justify-center">
          <AlertIcon className="w-4 mr-1" />
          <span>{error}</span>
        </h3>
      </ModalWrapCenter>
    </ModalClose>
  );
}

export function CommentEdit({
  onClose,
  _id,
  initialComment
}: {
  onClose: () => void;
  _id: string;
  initialComment: CommentEditProps;
}) {
  //댓글 수정 내용
  const [newComment, setNewComment] = useState<CommentEditProps>({
    content: initialComment.content,
    password: initialComment.password,
    color: initialComment.color
  });
  //프로필 캐릭터 색상
  const [selectedCharacterColor, setSelectedCharacterColor] = useState<
    string | undefined
  >(initialComment.color);
  //모달
  const [showModal, setShowModal] = useState<string>("");
  const [showCommentEditModal, setShowCommentEditModal] = useState(true);
  //에러타입
  const [errorType, setErrorType] = useState<string>("");

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
  //캐릭터 모달
  const handleCharacterModal = () => {
    setShowModal(showModal === "CharacterModal" ? "" : "CharacterModal");
  };
  //캐릭터 색상변경
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

  //댓글 수정 api
  async function editData() {
    const { content, password, color } = newComment;
    const commentId = _id;
    try {
      await axiosRequest.requestAxios<ResData<CommentEditProps>>(
        "patch",
        `/comment/${commentId}`,
        {
          content: content,
          password: password,
          color: color
        }
      );
      setShowCommentEditModal(false);
    } catch (error) {
      console.error(error);
    }
  }
  //유효성 검사 및 등록
  const handleSubmit = () => {
    const { content, password, color } = newComment;

    if (content === "") {
      setErrorType("댓글을 입력해주세요!");
      setShowModal("AlertModal");
      return;
    } else if (password === "") {
      setErrorType("비밀번호를 입력해주세요!");
      setShowModal("AlertModal");
      return;
    } else if (color === "") {
      setErrorType("색상을 선택해주세요!");
      setShowModal("AlertModal");
      return;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password || "")) {
      setErrorType("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setShowModal("AlertModal");
      return;
    }

    console.log("댓글 데이터:", newComment);
    console.log("선택된 색상:", selectedCharacterColor);
    setErrorType("");
    editData(); //수정 데이터
  };

  //댓글 수정 모달
  return (
    <>
      {showCommentEditModal === true && (
        <>
          <CommentModalBg onClick={() => setShowCommentEditModal(false)} />
          <CommentEditWrap>
            <CommentEditBox>
              <CommentEditTop>
                <button onClick={handleCharacterModal}>
                  <CommentCharacter
                    bgColor={selectedCharacterColor as string}
                  />
                </button>
                <input
                  type="text"
                  placeholder="댓글 달기"
                  value={newComment.content}
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
                    onClick={handleSubmit}
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
                  onClick={() => setShowCommentEditModal(false)}
                />
                {showModal === "CharacterModal" && (
                  <CommentCharacterSelector
                    selectCharacterColor={selectedCharacterColor as string}
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
    </>
  );
}
