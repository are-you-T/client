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
import { useQuery } from "@tanstack/react-query";

export default function TestResult() {
  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const mbtiType: string | null = searchParms.get("mbti");
  const colorObj: Color = colorData.filter(
    (color) => color.mbti === mbtiType
  )[0];
  const resultData: ResultData | null = location.state
    ? location.state.resultData
    : null;

  const {
    data: mbti,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["mbti", "mbtiType"],
    queryFn: () =>
      axiosRequest.requestAxios<ResData<ResMbti>>("get", `/mbti/${mbtiType}`),
    select: ({ data }) => data,
    staleTime: 10 * 60 * 1000,
    retry: 3
  });

  const handleShareButtonClick = () => {
    handleShareClick();
  };

  return (
    <Container style={{ backgroundColor: colorObj.out }}>
      <Header>
        <Title>{mbti?.name}</Title>
        <ShareButton onClick={handleShareButtonClick}>
          결과 공유하기
        </ShareButton>
      </Header>
      <Main>
        <MainTop>
          <Character bgcolor={colorObj.in} gcolor={colorObj.out} />
          <ContentWrapper style={{ backgroundColor: colorObj.in }}>
            <ContentTitle>
              {mbti?.summary} {mbti?.name}
            </ContentTitle>
            <Content>{mbti?.content?.description}</Content>
            <HashTags>
              <HashTag text={mbti?.tag[0]}></HashTag>
              <HashTag text={mbti?.tag[1]}></HashTag>
              <HashTag text={mbti?.tag[2]}></HashTag>
              <HashTag text={mbti?.tag[3]}></HashTag>
            </HashTags>
          </ContentWrapper>
        </MainTop>
        <MainBottom style={{ backgroundColor: colorObj.out }}>
          {resultData && <TypePercentageBars result={resultData} />}
          <RelationType good={mbti?.content?.good} bad={mbti?.content?.bad} />
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
