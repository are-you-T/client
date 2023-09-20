import tw from "tailwind-styled-components";

interface HashTagProps {
  text: string;
}

export default function HashTag({ text }: HashTagProps) {
  return <Tag>#{text}</Tag>;
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
`;
