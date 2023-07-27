import React from 'react';
import {Link} from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import tw from 'tailwind-styled-components';

export default function Home() {
  return (
    <HomeSection>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
      <Text>메인 페이지</Text>
     
      <Link to='/test' className='flex items-center text-brand border-b border-brand'>테스트 하러가기<BsChevronRight/></Link>
    </HomeSection>
  );
}

const HomeSection = tw.main`
  flex
  flex-col
  min-h-full  
  bg-orange-500
  justify-center 
  items-center
`;

const Text = tw.div`
  text-2xl
  font-bold
`

