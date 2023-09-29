import {Container, Title, Main, Top, BarBackground, Bottom} from "./TypePercentageBar.styles";

interface testResultBar {
  title: string;
  textColor: string;
  barColor: string;
  result: any;
}

export default function TypePercentageBar({
  title,
  textColor,
  barColor,
  result,
}: testResultBar) {
  const key1 : string = Object.keys(result)[0];
  const key2 : string = Object.keys(result)[1];
  const t1 : string = result[key1] > result[key2] ? key1: key2;
  const t2 : string = result[key1] > result[key2] ? key2: key1;
  const num1 : number = result[t1];
  return (
    <Container>
      <Title>{title}</Title>
      <Main>
        <Top>
          <span className={textColor}>{result[t1]}%</span>
          <BarBackground>
            <div className={`${barColor} h-3`} style={{width:`${num1}%`}}></div>
          </BarBackground>
          <span>{result[t2]}%</span>
        </Top>
        <Bottom>
          <span className={textColor}>{t1}</span>
          <span>{t2}</span>
        </Bottom>
      </Main>
    </Container>
  );
}
