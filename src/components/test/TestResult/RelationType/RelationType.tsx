import {Container, Title, GoodType, TypeTitle, Mbti, Contents, BadType } from "./RelationType.styles";

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
