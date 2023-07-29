import React from 'react';
import tw from "tailwind-styled-components";

//@ts-ignore
export default function HashTag({text}) {
  return (
    <Tag>#{text}</Tag>
  );
}

const Tag = tw.li`
rounded-2xl
bg-white
text-black
text-sm
w-32
mt-5
p-1
opacity-40
`