import React from 'react';
import tw from "tailwind-styled-components";

export default function RelationType() {
  return (
    <Container>
      <Title>유형별 관계성</Title>
      <GoodType>
        <TypeTitle>잘 어울리는 유형</TypeTitle>
        <Mbti>❤️ENFP❤️</Mbti>
        <Contents>내성적이며 무뚝뚝한 INTJ는 ENFP의 장난스럽고 재미있고 개방적인 특성에 매력을 느낍니다. ENFP는 그들이 안전지대에서 벗어나 새로운 것을 시도하도록 격려합니다. 반대로 ENFP도 INTJ의 지적이고 단호하며 신중한 성격에 매력을 느낍니다. 특히 INTJ는 ENFP의 크지만 다소 추상적인 계획을 구체적인 계획으로 전환시켜 실행할 수 있도록 도움을 줍니다. </Contents>
      </GoodType>
      <BadType>
        <TypeTitle>친해지기 힘든 유형</TypeTitle>
        <Mbti>❄️ISFJ❄️</Mbti>
        <Contents>서로간의 추구하는 가치가 달라 성격적인 부분에서 충돌할 가능성이 높으며, INTJ는 직설적인 표현을, ISFJ는 배려하는 표현을 선호하기 때문에 의사표현 때문에 오해가 생길 수 있습니다.</Contents>
      </BadType>
    </Container>
  );
}

const Container = tw.div`
flex
flex-col
items-center
my-10
px-4
text-black
`
const Title = tw.h5`
text-3xl
font-bold
my-10
`
const GoodType = tw.div`
mb-3
bg-pink-100
rounded-lg
p-4
`
const BadType = tw.div`
mt-3
bg-blue-100
rounded-lg
p-4
`
const TypeTitle = tw.p`
text-lg
text-center
font-bold
`
const Mbti = tw.p`
text-lg
text-center
font-bold
mb-2`
const Contents = tw.div`
w-full
`