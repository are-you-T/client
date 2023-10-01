import StatsMbtiButtons from "@/components/stats/StatsMbtiButtons/StatsMbtiButtons";
import { Link } from "react-router-dom";
import * as S from "./Home.styles";

export default function Home() {
  return (
    <S.Background>
      <S.Container>
        <S.Character />
        <S.ContentWrapper>
          <S.Title>ARE YOU T?</S.Title>
          <Link to="/test">
            <S.FirstButton>테스트 하러가기</S.FirstButton>
          </Link>
          <Link to="/stats">
            <S.Button>통계 보러가기</S.Button>
          </Link>
          <Link to="/board">
            <S.Button>담벼락 보러가기</S.Button>
          </Link>
        </S.ContentWrapper>
      </S.Container>
    </S.Background>
  );
}
