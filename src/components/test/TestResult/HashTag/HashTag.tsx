import { Tag } from "./HashTag.styles";

interface HashTagProps {
  text: string | undefined;
}

export default function HashTag({ text }: HashTagProps) {
  return <Tag>#{text}</Tag>;
}
