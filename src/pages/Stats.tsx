import React from 'react';
import { IoIosStats } from 'react-icons/io';
export default function Stats() {
  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold mb-2'>통계 페이지</h3>
      <IoIosStats className='my-4 text-8xl text-brand'/>
    </section>
  );
}

