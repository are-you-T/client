import React from 'react';
import tw from "tailwind-styled-components";
import HashTag from '../components/HashTag';
import TypePercentageBar from '../components/TypePercentageBar';
export default function TestResult() {
  return (
    <Container>
      <Header>
        <Type>INTJ</Type>
        <Button>결과 공유하기</Button>
      </Header>
      <Main>
          <Character></Character>
          <ContentWrapper>
            <CharTitle>당신의 유형은 독립적인 사상가 INTJ입니다</CharTitle>
            <CharContent>INTJ 유형이란? INTJ 성격 유형을 가진 사람들은 행동에 있어 자신감 있고 분석적이며 야심찬 경향이 있습니다. 그들은 지식 추구를 좋아하고 매우 논리적인 경향이 있습니다. 그들은 세상의 문제를 해결하는 데 초점을 맞춘 독립적인 사상가입니다.</CharContent>
            <HashTags>
              <HashTag text="쉿 분석중"></HashTag>
              <HashTag text="야망의 냄새"></HashTag>
              <HashTag text="지식인"></HashTag>
              <HashTag text="자기객관화 만점"></HashTag>
            </HashTags>
          </ContentWrapper>
          <OtherMain>
            <OtherTitle>내 검사 결과</OtherTitle>
            <TypePercentageBar title="에너지" type1="직관형" type2="현실주의형" percent1={80} percent2={20} bar="w-4/5" textColor="text-orange-500" barColor="bg-orange-500"/>
            <TypePercentageBar title="본성" type1="사고형" type2="감정형" percent1={60} percent2={40} bar="w-3/5" textColor="text-green-500" barColor="bg-green-500"/>
            <TypePercentageBar title="전술" type1="계획형" type2="탐색형" percent1={100} percent2={0} bar="w-5/5" textColor="text-purple-500" barColor="bg-purple-500"/>
          </OtherMain>
          <Buttons>
              <ButtonItem>다시하기</ButtonItem>
              <ButtonItem>통계 보러가기</ButtonItem>
              <ButtonItem>담벼락 보러가기</ButtonItem>
          </Buttons>
      </Main>
    </Container>
  );
}

const Container = tw.section`
w-[390px] 
bg-[#ffdf3f]
mx-auto 
my-0 
`
const Header = tw.header`
w-full
flex
justify-between
items-center
p-4
pb-6
`
const Type = tw.h3`
font-bold
text-5xl
text-white
`
const Button = tw.button`
bg-black
text-white
text-xl
font-bold
cursor-pointer
rounded-3xl
py-2
px-4
`
const Main = tw.section`
w-full
`
const Character = tw.div`
w-[390px]
h-[342px]
bg-test
bg-no-repeat
m-auto
border-[#B2ACF9]
border-b-4
`
const ContentWrapper = tw.div`
bg-[#0272f1]
py-5
px-10
pb-20
text-black
text-center
relative
bottom-5
`;
const CharTitle = tw.h5`
text-white
text-2xl
font-bold
mb-6
`
const CharContent = tw.div`
text-white
text-xl
mb-6
`
const HashTags = tw.ul`
list-none
grid
grid-cols-2
place-items-center
`
const  OtherMain= tw.section`
w-full
relative
bottom-5
bg-white
py-10
px-2
`
const OtherTitle = tw.div`
font-bold
text-3xl
text-black
text-center
pb-6
`
const Buttons = tw.div`
flex
flex-col
pt-5
pb-10
`

const ButtonItem = tw.div`
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
`