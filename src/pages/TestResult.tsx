import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import {Link} from 'react-router-dom';

export default function TestResult() {
  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold mb-2'>테스트 결과 페이지</h3>
      <p>당신은 OOO 유형입니다</p>
      <div className='flex my-2 space-x-8'>
        <Link to='/stats' className='flex items-center text-brand border-b border-brand'>통계 보러가기<BsChevronRight/></Link>
        <Link to='/bulletin' className='flex items-center text-brand border-b border-brand'>게시판 보러가기<BsChevronRight/></Link>
      </div>
    </section>
  );
}

