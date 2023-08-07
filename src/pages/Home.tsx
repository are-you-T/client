import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function Home() {
  return (
    <Background>
      <Container>
        <Character />
        <ContentWrapper>
          <Title>ARE YOU T?</Title>
          <Link to="/test">
            <FirstButton>테스트 하러가기</FirstButton>
          </Link>
          <Link to="/stats">
            <Button>통계 보러가기</Button>
          </Link>
          <Link to="/board">
            <Button>담벼락 보러가기</Button>
          </Link>
        </ContentWrapper>
      </Container>
    </Background>
  );
}

const Background = tw.div`
`;

const Container = tw.div`
bg-[#0272F1]
w-[390px]
m-auto
pt-16
`;

const ContentWrapper = tw.div`
bg-[#B2ACF9]
p-5
`;

const Character = tw.div`
w-[390px]
h-[342px]
bg-main
bg-no-repeat
m-auto
border-[#B2ACF9]
border-b-4
`;

const Title = tw.h3`
font-bold
text-6xl
text-center
mb-[60px]
text-[#000]
`;

const Button = tw.button`
block
p-4
w-[321px]
font-bold
text-lg
m-auto
rounded-[50px]
mb-[15px]
bg-[#000]
text-[#fff]
`;

const FirstButton = tw(Button)`
bg-[#FFDF3F]
text-[#000]
`;
