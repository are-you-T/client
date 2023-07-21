import React from 'react';
import {Link} from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

export default function Home() {
  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold mb-2'>메인 페이지</h3>
      <Link to='/test' className='flex items-center text-brand border-b border-brand'>테스트 하러가기<BsChevronRight/></Link>
    </section>
  );
}

