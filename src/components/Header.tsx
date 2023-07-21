import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';

export default function Header() {
  return (
    <header className='w-full flex items-center justify-between p-4 text-2xl border-b border-zinc-600 mb-4'>
        <Link to='/' className='text-brand text-3xl font-bold'>MBTI</Link>
        <nav>
          <Button text="버튼1"/>
          <Button text="버튼2"/>
          <Button text="버튼3"/>
        </nav>
    </header>
  );
}

