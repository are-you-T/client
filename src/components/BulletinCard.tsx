import React from 'react';

//@ts-ignore
export default function BulletinCard({mbti}) {
  return (
    <section  className='cursor-pointer w-40 h-40 border rounded border-zinc-500'>
      <header className='text-center'>{mbti}게시판</header>
    </section>
  );
}

