import React from 'react';
//@ts-ignore
export default function TestCard({contents}) {
  return (
    <div className='w-96 p-4 mb-4 cursor-pointer text-center border-2 border-gray-300 rounded'>
      <p>{contents}</p>
    </div>
  );
}

