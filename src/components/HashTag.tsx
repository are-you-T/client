import React from 'react';
import tw from "tailwind-styled-components";

//@ts-ignore
export default function HashTag({text}) {
  return (
    <Tag>#{text}</Tag>
  );
}

const Tag = tw.li`
rounded-3xl
bg-white
text-black
text-base
w-32
mt-5
p-2
opacity-40
`