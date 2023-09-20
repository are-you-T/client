import TypePercentageBar from "./TypePercentageBar";
import tw from "tailwind-styled-components";
import { ResultData } from "@/@types";

interface OwnProps {
  result : Omit<ResultData,'mbtiType'>;
}

export default function TypePercentageBars({result}:OwnProps) {
  const {energy, awareness, judgement, life  } = result;
  return (
    <Container>
      <Title>내 검사 결과</Title>
      <TypePercentageBar
        title="에너지"
        textColor="text-red-500"
        barColor="bg-red-500"
        result={energy}
      />
      <TypePercentageBar
        title="인식"
        textColor="text-orange-500"
        barColor="bg-orange-500"
        result={awareness}
      />
      <TypePercentageBar
        title="본성"
        textColor="text-green-500"
        barColor="bg-green-500"
        result={judgement}
      />
      <TypePercentageBar
        title="전술"
        textColor="text-purple-500"
        barColor="bg-purple-500"
        result={life}
      />
    </Container>
  );
}
const Container = tw.div`
w-full
bg-white
rounded-xl
px-2
pb-4
mb-10
`;
const Title = tw.div`
font-bold
text-3xl
text-black
text-center
py-6
`;
