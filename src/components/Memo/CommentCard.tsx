import useCommentController from "@/controllers/useCommentController";
import { useModal } from "@/hooks/useModal";
import { Database } from "@/types/supabase";
import { setDayjsFormatString } from "@/utils/formatDate";
import { ActionIcon, Button, ButtonGroup, Card, Flex, Group, Menu, Text } from "@mantine/core";
import { IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";
import { Confirm } from "@/components/Common/Confirm";
import { notifications } from "@mantine/notifications";
import { PasswordForm } from "@/components/Common/PasswordForm";
import { CommentNote } from "./CommentNote";

interface CommentCardProps {
  comment: Database["public"]["Tables"]["Comment"]["Row"];
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { openModal, closeModal } = useModal();
  // 컨트롤러는 memoId를 인자로 받음. 기존에 comment.id를 넘겨 잘못된 키로 캐시를 조작하고 있었음.
  const { deleteComment, passwordValidate, likeComment, isLiking } = useCommentController(
    comment.memoId
  );

  return (
    <Card shadow="lg" padding="lg" radius="md" bg="#FFFFFF" w="100%">
      <Flex direction="column" h="100%" gap="sm" justify="space-between">
        <Flex direction="column" gap="md">
          <Group justify="space-between">
            <Text fw={600}>{comment.nickname}</Text>
            <Menu shadow="md" withArrow withinPortal>
              <Menu.Target>
                <ActionIcon variant="subtle" color="dark" size="sm">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                      if (password) {
                        const result = await passwordValidate({
                          id: comment.id,
                          password: password as string,
                        });
                        if (result) {
                          openModal(
                            <CommentNote memoId={comment.memoId} id={comment.id} />,
                            null,
                            "댓글 수정",
                            true
                          ).then;
                        } else {
                          notifications.show({
                            title: "댓글 비밀번호 검증",
                            message: "댓글 비밀번호가 일치하지 않습니다.",
                            color: "red",
                          });
                        }
                      }
                    });
                  }}
                >
                  <Text fz="1.5rem">수정</Text>
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                      if (password) {
                        const result = await passwordValidate({
                          id: comment.id,
                          password: password as string,
                        });
                        if (result) {
                          openModal(
                            <Confirm
                              message="정말로 삭제하시겠어요? 😢"
                              yesCallback={async () => {
                                await deleteComment(comment.id);
                                notifications.show({
                                  title: "댓글 삭제 완료",
                                  message: "댓글이 삭제되었습니다.",
                                  color: "blue",
                                });
                              }}
                              noCallback={() => {}}
                              commonCallback={() => closeModal(null)}
                            />,
                            null,
                            "메모 삭제",
                            true
                          );
                        } else {
                          notifications.show({
                            title: "댓글 비밀번호 검증",
                            message: "댓글의 비밀번호가 일치하지 않습니다.",
                            color: "red",
                          });
                        }
                      }
                    });
                  }}
                >
                  <Text fz="1.5rem">삭제</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text size="md" h="100%">
            {comment.content}
          </Text>
        </Flex>
        <Flex justify="space-between" align="center">
          <ButtonGroup>
            <Button
              size="xs"
              variant="subtle"
              leftSection={<IconHeart />}
              color="dark"
              loading={isLiking(comment.id)}
              disabled={isLiking(comment.id)}
              onClick={() => likeComment(comment.memoId, comment.id)}
            >
              {comment.likeCount}
            </Button>
          </ButtonGroup>
          <Text ta="end">{setDayjsFormatString(comment.created_at)}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
