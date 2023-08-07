import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import HashTag from "@/components/test/HashTag";
import RelationType from "@/components/test/RelationType";
import { Link, useLocation } from "react-router-dom";
import axiosRequest from "@/api/index";
import TypePercentageBars from "@/components/test/TypePercentageBars";
import { resData, resMbti, color } from "@/interfaces";
import colorData from "@/constants/bgColor";
import Character from "@/components/common/Character";

export default function TestResult() {
  const [mbti, setMbti] = useState<resMbti>({
    _id: "",
    name: "",
    count: 0,
    summary: "",
    content: {
      description: "",
      good: {
        name: "",
        description: "",
      },
      bad: {
        name: "",
        description: "",
      },
      __v: 0,
    },
    tag: [],
  });

  const handleShareClick = async () => {
    await share(window.location.origin);
  };
  const share = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다!");
    } catch (e) {
      alert("초대코드 복사에 실패했습니다ㅜㅜ");
    }
  };

  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const mbtiType = searchParms.get('mbti');
  const colorObj: color = colorData.filter((color) => color.mbti === mbtiType)[0];
  const resultData = location.state ? location.state.resultData : null;
  
  useEffect(() => {
    const getMbti = async () => {
      try {
        const response: resData<resMbti> = await axiosRequest.requestAxios(
          "get",
          `/mbti/${mbtiType}`,
          {}
        );
        setMbti(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getMbti();
  }, []);

  const { name, summary, content, tag } = mbti;
  return (
    <Container style={{ backgroundColor: colorObj.out }}>
      <Header>
        <Title>{name}</Title>
        <ShareButton onClick={handleShareClick}>결과 공유하기</ShareButton>
      </Header>
      <Main>
        <MainTop>
        <Character bgcolor={colorObj.in} gcolor={colorObj.out}/>
          <ContentWrapper style={{ backgroundColor: colorObj.in }}>
            <ContentTitle>
              {summary} {name}
            </ContentTitle>
            <Content>{content?.description}</Content>
            <HashTags>
              <HashTag text={tag[0]}></HashTag>
              <HashTag text={tag[1]}></HashTag>
              <HashTag text={tag[2]}></HashTag>
              <HashTag text={tag[3]}></HashTag>
            </HashTags>
          </ContentWrapper>
        </MainTop>
        <MainBottom style={{ backgroundColor: colorObj.out }}>
          {resultData && <TypePercentageBars result={resultData}/>}
          <RelationType good={content?.good ?? ""} bad={content?.bad ?? ""} />
        </MainBottom>
      </Main>
      <Buttons>
        <HyperText to="/test">다시하기</HyperText>
        <HyperText to={`/stats/${mbtiType}`}>통계 보러가기</HyperText>
        <HyperText to={`/board/${mbtiType}`}>담벼락 보러가기</HyperText>
      </Buttons>
    </Container>
  );
}

const Container = tw.section`
w-[390px] 
mx-auto 
my-0 
`;
const Header = tw.header`
w-full
flex
justify-between
items-center
p-4
pb-6
`;
const Title = tw.h3`
font-bold
text-5xl
text-white
`;
const ShareButton = tw.button`
bg-black
text-white
text-xl
font-bold
cursor-pointer
rounded-3xl
py-2
px-4
`;
const Main = tw.section`
w-full
`;
const MainTop = tw.div`
w-full
`;
const CharacterImg = tw.div`
w-[390px]
h-[342px]
bg-test
`;
const ContentWrapper = tw.div`
bg-[#0272f1]
py-5
px-10
pb-20
text-center
relative
bottom-5
text-white
`;
const ContentTitle = tw.h5`
text-2xl
font-bold
mb-6
`;
const Content = tw.div`
text-xl
mb-6
`;
const HashTags = tw.ul`
list-none
grid
grid-cols-2
place-items-center
`;
const MainBottom = tw.section`
w-full
relative
bottom-5
bg-[#ffdf3f]
pt-10
px-5
`;
const Buttons = tw.div`
flex
flex-col
pb-10
`;
const HyperText = tw(Link)`
block
text-center
bg-black
rounded-3xl
text-white
font-bold
my-2
mx-10
py-2
text-xl
cursor-pointer
`;
