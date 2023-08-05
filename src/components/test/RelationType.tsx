import React from "react";
import tw from "tailwind-styled-components";

interface relation {
  good: {
    name: string;
    description: string;
  };
  bad: {
    name: string;
    description: string;
  };
}

export default function RelationType({ good, bad }: relation) {
  return (
    <Container>
      <Title>유형별 관계성</Title>
      <GoodType>
        <TypeTitle>잘 어울리는 유형</TypeTitle>
        <Mbti>❤️{good.name}❤️</Mbti>
        <Contents>{good.description}</Contents>
      </GoodType>
      <BadType>
        <TypeTitle>친해지기 힘든 유형</TypeTitle>
        <Mbti>❄️{bad.name}❄️</Mbti>
        <Contents>{bad.description}</Contents>
      </BadType>
    </Container>
  );
}

const Container = tw.div`
flex
flex-col
items-center
mt-10
px-4
text-black
bg-white
rounded-xl
`;
const Title = tw.h5`
text-3xl
font-bold
py-6
`;
const GoodType = tw.div`
mt-2
mb-6
bg-pink-100
rounded-lg
p-4
`;
const BadType = tw.div`
mb-8
bg-blue-100
rounded-lg
p-4
`;
const TypeTitle = tw.p`
text-lg
text-center
font-bold
mb-2
`;
const Mbti = tw.p`
text-base
text-center
font-bold
mb-2
`;
const Contents = tw.div`
w-full
`;
