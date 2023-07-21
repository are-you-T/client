import React from 'react';
import BulletinCard from '../components/BulletinCard';

export default function BulletinBoard() {
  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold mb-2'>게시판 페이지</h3>
      <main className='grid grid-cols-4 gap-4'>
        <BulletinCard mbti={'INTJ'}/>
        <BulletinCard mbti={'INTP'}/>
        <BulletinCard mbti={'ENTJ'}/>
        <BulletinCard mbti={'ENTP'}/>
        <BulletinCard mbti={'INFJ'}/>
        <BulletinCard mbti={'INFP'}/>
        <BulletinCard mbti={'ENFJ'}/>
        <BulletinCard mbti={'ENFP'}/>
        <BulletinCard mbti={'ISTJ'}/>
        <BulletinCard mbti={'ISFJ'}/>
        <BulletinCard mbti={'ESTJ'}/>
        <BulletinCard mbti={'ESFJ'}/>
        <BulletinCard mbti={'ISTP'}/>
        <BulletinCard mbti={'ISFP'}/>
        <BulletinCard mbti={'ESTP'}/>
        <BulletinCard mbti={'ESFP'}/>
      </main>
    </section>
  );
}

