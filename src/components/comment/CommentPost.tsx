import { ReactNode, useState } from "react";
import axiosRequest from "@/api";
import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import {
  CommentPostWrap,
  CommentPostBox,
  CommentPostTop,
  CommentPostBottom,
  CommentPostBottomDetail,
  CommentCharacterWrap,
  CommentCharacterModalBg
} from "@/components/comment/CommentPost.styles";
import CommentCharacter from "@/components/common/CommentCharacter";
import { ResData, Comment, CommentPostData } from "@/@types";
import { ModalWrapCenter } from "../board/BoardPost/BoardPost.styles";
import { ModalBg } from "../common/MbtiTypesModal/MbtiTypesModal.styles";

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
// 모달 배경닫기
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

// 댓글등록
export function CommentPostContent() {
  const [showModal, setShowModal] = useState<string>("");
  const [errorType, setErrorType] = useState<string>("");
  const [selectedCharacterColor, setSelectedCharacterColor] =
    useState("#B2ACF9");
  const [newComment, setNewComment] = useState<{
    content: string;
    password: string;
  }>({ content: "", password: "" });

  //댓글 등록 api
  async function postData() {
    //게시글 id 불러오기
    const response = await axiosRequest.requestAxios<ResData<Comment>>(
      "get",
      "/board"
    );
    const boardId = response.data.boardId;
    const { content, password } = newComment;
    console.log("게시글 api", response);
    try {
      await axiosRequest.requestAxios<ResData<CommentPostData>>(
        "post",
        "/comment",
        {
          boardId: boardId,
          depthCommentId: null,
          password: password,
          content: content,
          color: selectedCharacterColor
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  //캐릭터 모달
  const handleCharacterModal = () => {
    setShowModal("CharacterModal");
  };
  //캐릭터 색상변경
  const handleCharacterColorChange = (color: string) => {
    setSelectedCharacterColor(color);
    setShowModal("");
  };

  //유효성 검사
  const handleSubmit = () => {
    // 유효성 정상이면 api요청 보내고,
    // 현재 mbti유형을 부모컴포넌트에게 전달해주고,
    // 부모컴포넌트가 이 컴포넌트를 사라지게하고 스크롤이 올라가도록
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
    postData();
  };

  return (
    <>
      <CommentPostWrap>
        <CommentPostBox>
          <CommentPostTop>
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
          </CommentPostTop>
          <CommentPostBottom>
            <p>비밀번호</p>
            <CommentPostBottomDetail>
              <input
                type="password"
                placeholder="비밀번호 입력"
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
            </CommentPostBottomDetail>
          </CommentPostBottom>
        </CommentPostBox>
        {showModal !== "" && (
          <>
            <CommentCharacterModalBg onClick={() => setShowModal("")} />
            {showModal === "CharacterModal" && (
              <CommentCharacterSelector
                selectCharacterColor={selectedCharacterColor}
                onCharacterColorChange={handleCharacterColorChange}
              />
            )}
            {showModal === "AlertModal" && (
              <AlertModal error={errorType} onClose={() => setShowModal("")} />
            )}
          </>
        )}
      </CommentPostWrap>
    </>
  );
}
