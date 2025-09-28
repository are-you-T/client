import { CommentInsertDto } from "@/actions/comment.actions";
import useCommentController from "@/controllers/useCommentController";
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import { CommentType } from "@/types";
import { Button, Flex, Group, PasswordInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

interface CommentNoteProps {
  memoId: CommentType["memoId"];
  id?: CommentType["id"]; // 있으면 수정 모드
}

export const CommentNote = ({ memoId, id }: CommentNoteProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { closeModal } = useModal();

  // 컨트롤러: create/update & 단일 댓글 조회 훅
  const { createComment, updateComment, getComment } = useCommentController(memoId);

  // id가 없을 수 있는 create 모드에서도 훅 규칙 지키기 위해
  // 빈 문자열로 호출하고, 훅 내부 enabled로 실제 호출은 막음
  const { data: comment } = getComment(id ?? "");

  // ✅ 최초엔 빈값으로 시작 (Mantine은 initialValues가 자동 갱신되지 않음)
  const form = useForm<CommentInsertDto>({
    initialValues: {
      memoId,
      nickname: "",
      content: "",
      password: "",
      // 필요한 경우 parentCommentId, 기타 필드 포함
    },
  });

  // ✅ comment가 도착하면 폼에 값 주입 (수정 모드일 때만)
  useEffect(() => {
    if (id && comment) {
      form.setValues({
        memoId,
        nickname: comment.nickname ?? "",
        content: comment.content ?? "",
        password: "", // 보안상 비밀번호는 항상 빈값으로
        // parentCommentId: comment.parentCommentId ?? null, // 필요시
      } as CommentInsertDto);
    }
  }, [id, comment, memoId]); // comment가 들어오거나 바뀔 때 반영

  const validate = () => {
    const { nickname, content, password } = form.values;
    if ((nickname ?? "").trim().length < 2) {
      notifications.show({
        title: "닉네임 입력",
        message: "2글자 이상 닉네임을 입력해 주세요.",
        color: "yellow",
      });
      return false;
    }
    if ((content ?? "").trim().length < 1) {
      notifications.show({
        title: "내용 입력",
        message: "내용을 입력해 주세요.",
        color: "yellow",
      });
      return false;
    }
    if ((password ?? "").length < 4) {
      notifications.show({
        title: "비밀번호 입력",
        message: "4글자 이상 비밀번호를 입력해 주세요.",
        color: "yellow",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (id) {
      // ✅ 수정 모드: per-call onSuccess로 알림 & 닫기
      updateComment(
        {
          id,
          ...form.values,
        },
        {
          onSuccess: () => {
            notifications.show({
              title: "댓글 수정 완료",
              message: "댓글이 수정되었습니다.",
              color: "blue",
            });
            closeModal(form.values);
          },
          onError: (error) => {
            notifications.show({
              title: "댓글 수정 실패",
              message: "댓글 수정 중 오류가 발생했어요. 😥",
              color: "red",
            });
            setError(error);
          },
        }
      );
    } else {
      // ✅ 생성 모드
      createComment(form.values, {
        onSuccess: () => {
          notifications.show({
            title: "댓글 작성 완료",
            message: "댓글이 작성되었습니다.",
            color: "blue",
          });
          closeModal(form.values);
        },
        onError: (e: any) => {
          notifications.show({
            title: "작성 실패",
            message: e?.message ?? "잠시 후 다시 시도해 주세요.",
            color: "red",
          });
        },
      });
    }
  };

  return (
    <Flex direction="column" gap="xs">
      <TextInput label="닉네임" {...form.getInputProps("nickname")} />
      <Textarea label="내용" autosize minRows={4} {...form.getInputProps("content")} />
      <PasswordInput label="비밀번호" {...form.getInputProps("password")} />
      <Group grow gap="xs" mt="xs">
        <Button color="gray" onClick={() => closeModal(null)}>
          취소
        </Button>
        <Button onClick={handleSubmit}>{id ? "수정" : "저장"}</Button>
      </Group>
    </Flex>
  );
};
