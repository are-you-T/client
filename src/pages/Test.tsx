import React from 'react';
import TestCard from '../components/TestCard';
import { BsChevronRight } from 'react-icons/bs';
import {Link} from 'react-router-dom';

export default function Test() {
  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold mb-2'>테스트 페이지</h3>
      <main>
        <TestCard contents='나는 혼자가 편하다'/>
        <TestCard contents='나는 사람이 좋다 '/>
      </main>
      <Link to='/test/result' className='flex items-center text-brand border-b border-brand'>결과보기<BsChevronRight/></Link>
    </section>
  );
}

