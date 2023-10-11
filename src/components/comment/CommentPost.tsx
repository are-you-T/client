import { useState } from "react";
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

export function CommentPostContent() {
  const [showModal, setShowModal] = useState<string>("");
  const [selectedCharacterColor, setSelectedCharacterColor] =
    useState("#B2ACF9");

  const handleCharacterModal = () => {
    setShowModal("CharacterModal");
  };

  const handleCharacterColorChange = (color: string) => {
    setSelectedCharacterColor(color);
    setShowModal("");
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
            />
          </CommentPostTop>
          <CommentPostBottom>
            <p>비밀번호</p>
            <CommentPostBottomDetail>
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-[50%]  h-[30px] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
              />
              <button className="w-[30%] h-[30px] bg-black rounded-[10px] text-white text-[14px]">
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
          </>
        )}
      </CommentPostWrap>
    </>
  );
}
