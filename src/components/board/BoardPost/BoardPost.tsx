import { useState, useCallback } from "react";
import { ReactComponent as SwitchIcon } from "@/assets/img/typeSwitch_icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import { ReactComponent as CloseIcon } from "@/assets/img/close_icon.svg";
import { ReactComponent as CheckIcon } from "@/assets/img/check_icon.svg";
import { ReactComponent as Comment } from "@/assets/img/comment.svg";

import MbtiTypesModal, { ModalBg } from "@/components/common/MbtiTypesModal";
import axiosRequest from "@/api";
import { ResData, BoardPostData } from "@/@types";
import {
  ModalWrap,
  SelectColors,
  ModalWrapCenter,
  Container,
  PostWrap,
  PostTitle,
  CircleButton,
  MbtiType,
  Button,
  BorderButton,
  CommentModalWrap
} from "./BoardPost.styles";
import { CommentContent } from "@/components/comment/CommentContent";
import { CommentPostContent } from "@/components/comment/CommentPost";

// 모달 배경부분(ModalBg) 클릭하면 모달창이 꺼지고 모달컴포넌트 안에서 선택된 state값들을 부모(BoardPost)에게 보내줌

// 배경 색상 종류
const colors = [
  { name: "화이트", color: "white" },
  { name: "퍼플", color: "#B2ACF9" },
  { name: "옐로우", color: "#FFDE3F" },
  { name: "핑크", color: "#EFC7D6" },
  { name: "그린", color: "#9FEEA2" },
  { name: "블루", color: "#78D9EE" },
  { name: "오렌지", color: "#FF9D42" }
];

// 배경 색상 선택 모달
function BgColorsModal({
  colors,
  onThisColor,
  selectBgColor
}: {
  colors: { name: string; color: string }[];
  onThisColor: (value: string) => void;
  selectBgColor: String;
}) {
  const [thisColor, setThisColor] = useState(selectBgColor);
  return (
    <ModalWrap>
      <h3 className="text-2xl font-black text-center">배경 색상 선택</h3>
      <ul>
        {colors.map((color) => {
          return (
            <li key={color.color} className="flex items-center mt-5">
              <input
                type="radio"
                name="colors"
                id={color.color}
                value={color.color}
                checked={thisColor === color.color}
                className="hidden"
                onChange={(evt) => {
                  setThisColor(evt.target.value);
                  onThisColor(evt.target.value);
                }}
              />
              <label
                htmlFor={color.color}
                className="flex items-center cursor-pointer flex-1 gap-4"
              >
                <SelectColors bg={color.color} />
                <span
                  className={`flex-1 text-xl ${
                    thisColor === color.color
                      ? "font-black opacity-100"
                      : "opacity-30"
                  }`}
                >
                  {color.name}
                </span>
                {thisColor === color.color && <CheckIcon />}
              </label>
            </li>
          );
        })}
      </ul>
    </ModalWrap>
  );
}

// 유효성 결과 모달
function AlertModal({ error }: { error: string }) {
  return (
    <ModalWrapCenter>
      <h3 className="text-xl font-black text-center flex items-center justify-center">
        <AlertIcon className="w-4 mr-1" />
        <span>{error}</span>
      </h3>
    </ModalWrapCenter>
  );
}

//댓글 모달 임시
function CommentModal() {
  return (
    <CommentModalWrap>
      {/* 모달 내용 */}
      {/* 댓글내용 컴포넌트 */}
      <CommentContent />
      {/* 댓글등록 컴포넌트 */}
      <CommentPostContent />
    </CommentModalWrap>
  );
}

// 게시글 작성
export default function BoardPost({
  onThisClose,
  onThisComplete,
  thisMbti
}: {
  onThisClose: () => void;
  onThisComplete: (value: string) => void;
  thisMbti: string;
}) {
  const [bgColor, setBgColor] = useState<string>("white");
  const [mbtiType, setMbtiType] = useState<string[]>(Array.from(thisMbti));
  const [newPost, setNewPost] = useState<{ title: string; content: string }>({
    title: "",
    content: ""
  });
  const [showModal, setShowModal] = useState<string>("");
  const [errorType, setErrorType] = useState<string>("");

  // 추후에 BoardPost props가 될 것들
  // mbti 타입변경할 때 마다 색상이 바뀌어야할텐데 정신없을 것 같아서 그냥 고정 색상값으로 하는 게 어떨까
  const mbtiColor_1 = "#02B26E";
  const mbtiColor_2 = "#FFA8DF";

  async function postData() {
    const { title, content } = newPost;

    await axiosRequest.requestAxios<ResData<BoardPostData>>("post", "/board", {
      category: mbtiType.join(""),
      title: title,
      content: content,
      color: bgColor
    });
  }

  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  const handleSubmit = () => {
    // 유효성 정상이면 api요청 보내고,
    // 현재 mbti유형을 부모컴포넌트에게 전달해주고,
    // 부모컴포넌트가 이 컴포넌트를 사라지게하고 스크롤이 올라가도록
    const { title, content } = newPost;

    if (title === "") {
      setErrorType("제목을 입력해주세요!");
      setShowModal("AlertModal");
      return;
    } else if (content === "") {
      setErrorType("내용을 입력해주세요!");
      setShowModal("AlertModal");
      return;
    }

    console.log("작성완료");
    setErrorType("");
    postData();
    onThisComplete(mbtiType.join(""));
  };

  //댓글 모달 임시
  const handleCommentClick = () => {
    setShowModal("CommentModal");
  };
  return (
    <Container>
      <PostWrap>
        <PostTitle>
          <CircleButton
            bg={mbtiColor_1}
            onClick={() => setShowModal("MbtiTypesModal")}
          >
            <SwitchIcon className="m-auto" />
          </CircleButton>
          <MbtiType>{mbtiType}</MbtiType>
          <CircleButton bg={mbtiColor_2} onClick={() => onThisClose()}>
            <CloseIcon className="m-auto" />
          </CircleButton>
        </PostTitle>
        <form className="flex-1 text-2xl">
          <input
            type="text"
            name="title"
            placeholder="제목"
            className="text-white bg-black outline-0 border-b w-full py-3 mb-6"
            onChange={(evt) =>
              setNewPost((post) => {
                return { ...post, title: evt.target.value };
              })
            }
          />
          <textarea
            name="contents"
            placeholder="내용 입력"
            className="text-white bg-black outline-0 border w-full p-3 resize-none h-5/6"
            onChange={(evt) =>
              setNewPost((post) => {
                return { ...post, content: evt.target.value };
              })
            }
          />
        </form>
        <div>
          <BorderButton
            onClick={() => setShowModal("BgColorsModal")}
            name="BgColorsModal"
            type="button"
            className="mb-4 "
          >
            <span>배경 색상</span>
            <div
              className="w-5 h-5 ml-3"
              style={
                {
                  backgroundColor: bgColor
                } as React.CSSProperties
              }
            ></div>
          </BorderButton>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="block font-black "
          >
            작성 완료
          </Button>
        </div>
      </PostWrap>

      {showModal !== "" && (
        <>
          <ModalBg onClick={() => setShowModal("")} />
          {showModal === "MbtiTypesModal" && (
            <MbtiTypesModal
              selectMbti={mbtiType}
              onThisMbti={handleThisMbti}
              isButton={false}
            />
          )}
          {showModal === "BgColorsModal" && (
            <BgColorsModal
              colors={colors}
              onThisColor={(value) => setBgColor(value)}
              selectBgColor={bgColor}
            />
          )}
          {showModal === "AlertModal" && <AlertModal error={errorType} />}
          {/* 댓글 모달 임시 */}
          {showModal === "CommentModal" && <CommentModal />}
        </>
      )}
      <Comment onClick={handleCommentClick} />
    </Container>
  );
}
