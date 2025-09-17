import { MemoType } from "@/types";
import { Flex, PasswordInput, Textarea, TextInput } from "@mantine/core";

interface CommentNoteProps {
  memoId: MemoType["id"];
}

export const CommentNote = ({ memoId }: CommentNoteProps) => {
  return (
    <Flex direction="column">
      <TextInput label="닉네임" />
      <Textarea label="내용" />
      <PasswordInput label="비밀번호" />
    </Flex>
  );
};
