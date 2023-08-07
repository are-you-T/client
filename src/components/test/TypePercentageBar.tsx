import React from "react";
import tw from "tailwind-styled-components";

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

const Container = tw.div`
text-center
text-black
p-2
`;
const Title = tw.div`
font-bold
text-xl
`;
const Main = tw.div`
w-full
`;
const Top = tw.div`
flex
justify-between
font-bold
items-center
gap-2
`;
const Bottom = tw.div`
flex
justify-between
`;
const BarBackground = tw.div`
bg-gray-100
h-3
w-full
rounded-3xl
overflow-hidden
`;
