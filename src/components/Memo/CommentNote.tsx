import { CommentInsertDto } from "@/actions/comment.actions";
import useCommentController from "@/controllers/useCommentController";
import { useModal } from "@/hooks/useModal";
import { MemoType } from "@/types";
import { Button, Flex, Group, PasswordInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

interface CommentNoteProps {
  memoId: MemoType["id"];
}

export const CommentNote = ({ memoId }: CommentNoteProps) => {
  const { closeModal } = useModal();
  const { createComment } = useCommentController(memoId);

  const form = useForm<CommentInsertDto>({
    initialValues: {
      memoId,
      nickname: "",
      content: "",
      password: "",
    },
  });

  const validation = () => {
    const { nickname, content, password } = form.values;
    if (nickname.length < 2) {
      notifications.show({
        title: "닉네임 입력",
        message: "2글자 이상 닉네임을 입력해 주세요.",
        color: "yellow",
      });
      return;
    }

    if (content.length < 1) {
      notifications.show({
        title: "내용 입력",
        message: "내용을 입력해 주세요.",
        color: "yellow",
      });
      return;
    }

    if (password.length < 4) {
      notifications.show({
        title: "비밀번호 입력",
        message: "4글자 이상 비밀번호를 입력해 주세요.",
        color: "yellow",
      });
      return;
    }

    return true;
  };

  const handleCreateComment = async () => {
    if (!validation()) {
      return;
    }

    await createComment(form.values);

    notifications.show({
      title: "댓글 작성 완료",
      message: "댓글이 작성되었습니다.",
      color: "blue",
    });

    closeModal(form.values);
  };

  return (
    <Flex direction="column" gap="xs">
      <TextInput label="닉네임" {...form.getInputProps("nickname")} />
      <Textarea label="내용" {...form.getInputProps("content")} />
      <PasswordInput label="비밀번호" {...form.getInputProps("password")} />
      <Group grow gap="xs">
        <Button color="gray" onClick={closeModal}>
          취소
        </Button>
        <Button onClick={handleCreateComment}>저장</Button>
      </Group>
    </Flex>
  );
};
