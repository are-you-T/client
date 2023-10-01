import {Tag} from "./HashTag.styles";

interface HashTagProps {
  text: string;
}

export default function HashTag({ text }: HashTagProps) {
  return <Tag>#{text}</Tag>;
}

