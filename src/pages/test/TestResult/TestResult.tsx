import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axiosRequest from "@/api/index";
import { ResData, ResMbti, Color, ResultData } from "@/@types";

import HashTag from "@/components/test/TestResult/HashTag/HashTag";
import RelationType from "@/components/test/TestResult/RelationType/RelationType";
import TypePercentageBars from "@/components/test/TestResult/TypePercentageBars/TypePercentageBars";
import colorData from "@/constants/bgColor";
import Character from "@/components/common/Character";
import {
  Container,
  Header,
  Title,
  ShareButton,
  Main,
  MainTop,
  ContentWrapper,
  ContentTitle,
  Content,
  HashTags,
  MainBottom,
  Buttons,
  HyperText
} from "./TestResult.styles";
import { handleShareClick } from "@/components/common/ShareLink";

export default function TestResult() {
  const [mbti, setMbti] = useState<ResMbti>({
    _id: "",
    name: "",
    count: 0,
    summary: "",
    content: {
      description: "",
      good: {
        name: "",
        description: ""
      },
      bad: {
        name: "",
        description: ""
      },
      __v: 0
    },
    tag: []
  });

  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const mbtiType: string | null = searchParms.get("mbti");
  const colorObj: Color = colorData.filter(
    (color) => color.mbti === mbtiType
  )[0];
  const resultData: ResultData | null = location.state
    ? location.state.resultData
    : null;

  useEffect(() => {
    const getMbti = async () => {
      try {
        const response: ResData<ResMbti> = await axiosRequest.requestAxios(
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

  // const handleShareClick = async () => {
  //   const url = `${window.location.origin}/result${location.search}`;
  //   await share(url);
  // };
  // const share = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     alert("링크가 복사되었습니다!");
  //   } catch (e) {
  //     alert("초대코드 복사에 실패했습니다ㅜㅜ");
  //   }
  // };
  const handleShareButtonClick = () => {
    handleShareClick();
  };

  const { name, summary, content, tag } = mbti;
  return (
    <Container style={{ backgroundColor: colorObj.out }}>
      <Header>
        <Title>{name}</Title>
        <ShareButton onClick={handleShareButtonClick}>
          결과 공유하기
        </ShareButton>
      </Header>
      <Main>
        <MainTop>
          <Character bgcolor={colorObj.in} gcolor={colorObj.out} />
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
          {resultData && <TypePercentageBars result={resultData} />}
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
