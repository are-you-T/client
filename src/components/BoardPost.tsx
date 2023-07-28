import React, { useState } from "react";
import tw from "tailwind-styled-components";

// 모달들 배경부분(공통 스타일컴포넌트로 만들기) 클릭하면 모달창이 꺼지고 선택된 state값들을 부모에게 보내줌
function BgColorsModal() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[390px] m-auto">
      배경색상 모달
    </div>
  );
}

function MbtiTypesModal() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[390px] m-auto">
      MBTI 모달
    </div>
  );
}

function AlertModal() {
  return <div>경고 문구</div>;
}

function BoardPost() {
  const [bgColor, setBgColor] = useState("white");
  const [bgColorsToggle, setBgColorsToggle] = useState(false);
  const [mbtiTypesToggle, setMbtiTypesToggle] = useState(false);

  // 추후에 BoardPost props가 될 것들
  const mbtiColor_1 = "#02B26E";
  const mbtiColor_2 = "#FFA8DF";
  const mbtiType = "INTJ";

  return (
    <Container>
      <PostWrap>
        <PostTitle>
          <CircleButton bg={mbtiColor_1}>
            <img src="/img/typeSwitch_icon.svg" className="m-auto" alt="" />
          </CircleButton>
          <MbtiType>{mbtiType}</MbtiType>
          <CircleButton bg={mbtiColor_2}>
            <img src="/img/close_icon.svg" className="m-auto" alt="" />
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
            onClick={() => setBgColorsToggle((show) => !show)}
            type="button"
            className="text-2xl border mb-4 w-full py-3 rounded-full flex justify-center items-center pl-2"
          >
            <span>배경 색상</span>
            <div
              className={`w-5 h-5 ml-3 ${
                bgColor === "white" ? "bg-white" : `bg-[${bgColor}]`
              }`}
            ></div>
          </button>
          <button
            type="submit"
            className="block text-2xl font-black w-full bg-[#FEDF40] text-black py-3 rounded-full"
          >
            작성 완료
          </button>
        </div>
      </PostWrap>
      {bgColorsToggle && <BgColorsModal />}
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
border-x
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

const CircleButton = tw.button<{ bg: string }>`
w-14 h-14 radius rounded-full
text-black
${({ bg }) => `bg-[${bg}]`}
`;
