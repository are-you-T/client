import React from 'react';
import tw from "tailwind-styled-components";


//@ts-ignore
export default function TypePercentageBar({title,type1,type2,percent1,percent2,bar,textColor,barColor}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Main>
        <Top>
          <span className={textColor}>{percent1}%</span>
          <BarBackground>
            <div className={`${barColor} ${bar} h-3`}></div>
          </BarBackground>
          <span>{percent2}%</span>
        </Top>
        <Bottom>
          <span className={textColor}>{type1}</span>
          <span>{type2}</span>
        </Bottom>
      </Main>
    </Container>
  );
}

const Container = tw.div`
bg-white
text-center
text-black
p-2
`
const Title = tw.div`
font-bold
text-xl
`
const Main = tw.div`
w-full
`
const Top = tw.div`
flex
justify-between
font-bold
items-center
gap-2
`
const Bottom = tw.div`
flex
justify-between
`
const BarBackground = tw.div`
bg-gray-100
h-3
w-full
rounded-3xl
overflow-hidden
`