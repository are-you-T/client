import React, { useState, useCallback } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { ReactComponent as SwitchIcon } from "@/assets/img/typeSwitch_icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import { ReactComponent as CloseIcon } from "@/assets/img/close_icon.svg";
import { ReactComponent as CheckIcon } from "@/assets/img/check_icon.svg";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";

// 모달들 배경부분(공통 스타일컴포넌트로 만들기) 클릭하면 모달창이 꺼지고 선택된 state값들을 부모에게 보내줌

// 배경 색상
const colors = [
  { name: "화이트", color: "white" },
  { name: "퍼플", color: "#B2ACF9" },
  { name: "옐로우", color: "#FFDE3F" },
  { name: "핑크", color: "#EFC7D6" },
  { name: "그린", color: "#9FEEA2" },
  { name: "블루", color: "#78D9EE" },
  { name: "오렌지", color: "#FF9D42" },
];
// 배경 색상 선택 모달
function BgColorsModal({
  colors,
  onThisColor,
  selectBgColor,
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
// title, contents props 설정해줘야 함
function AlertModal() {
  return (
    <ModalWrapCenter>
      <h3 className="text-xl font-black text-center flex items-center justify-center">
        <AlertIcon className="w-4" />
        <span>을 입력해주세요!</span>
      </h3>
    </ModalWrapCenter>
  );
}

// 게시글 작성
function BoardPost() {
  const [bgColor, setBgColor] = useState("white");
  const [mbtiType, setMbtiType] = useState(["I", "N", "T", "J"]);
  const [showModal, setShowModal] = useState("");

  // 추후에 BoardPost props가 될 것들
  // mbti 타입변경할 때 마다 색상이 바뀌어야할텐데 정신없을 것 같아서 그냥 고정 색상값으로 하는 게 어떨까
  const mbtiColor_1 = "#02B26E";
  const mbtiColor_2 = "#FFA8DF";

  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  const handleSubmit = () => {
    setShowModal("AlertModal");
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
          <CircleButton bg={mbtiColor_2}>
            <CloseIcon className="m-auto" />
          </CircleButton>
        </PostTitle>
        <form className="flex-1 text-2xl">
          <input
            type="text"
            name="title"
            placeholder="제목"
            className="text-white bg-black outline-0 border-b w-full py-3 mb-6"
          />
          <textarea
            name="contents"
            placeholder="내용 입력"
            className="text-white bg-black outline-0 border w-full p-3 resize-none h-5/6"
          />
        </form>
        <div>
          <button
            onClick={() => setShowModal("BgColorsModal")}
            name="BgColorsModal"
            type="button"
            className="text-2xl border mb-4 w-full py-3 rounded-full flex justify-center items-center pl-2"
          >
            <span>배경 색상</span>
            <div
              className="w-5 h-5 ml-3"
              style={{ backgroundColor: bgColor } as React.CSSProperties}
            ></div>
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="block text-2xl font-black w-full bg-[#FEDF40] text-black py-3 rounded-full"
          >
            작성 완료
          </button>
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
          {showModal === "AlertModal" && <AlertModal />}
        </>
      )}
    </Container>
  );
}

export default BoardPost;

const Container = tw.main`
bg-[#000000]
h-full
text-white
`;

const PostWrap = tw.div`
w-[390px]
h-full
m-auto
p-8
flex
flex-col
justify-between
gap-8
`;

const PostTitle = tw.div`
flex
justify-between
text-lg
`;

const MbtiType = tw.h3`
text-5xl font-black
`;

const ButtonColor = styled.button<{ bg: string }>`
  background-color: ${({ bg }) => bg};
`;
const SpanColor = styled.span<{ bg: string }>`
  background-color: ${({ bg }) => bg};
`;

const CircleButton = tw(ButtonColor)`
w-14 h-14 radius rounded-full
text-black
`;

const ModalBg = tw.div`
w-[390px] absolute top-0 left-1/2 -translate-x-1/2 h-full backdrop-blur-sm bg-black/[.3]
`;

const ModalWrap = tw.div`
bg-white rounded-t-3xl p-8 text-black absolute bottom-0 left-1/2 -translate-x-1/2 w-[390px] m-auto
`;

const ModalWrapCenter = tw.div`
bg-white rounded-3xl p-8 text-black absolute left-1/2 top-1/2 -translate-x-1/2 w-[370px] m-auto
`;

const SelectColors = tw(SpanColor)`
w-12 h-12 radius rounded-full border-black border-4 inline-block
`;
