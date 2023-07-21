import React from 'react';
//@ts-ignore
export default function Button({text}) {
  return (
    <button className='text-xl text-gray-600 mx-2'>
      {text}
    </button>
  );
}

