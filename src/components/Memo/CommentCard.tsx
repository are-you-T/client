import { Database } from "@/types/supabase";
import { setDayjsFormatString } from "@/utils/formatDate";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Group,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import { IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";

interface CommentCardProps {
  comment: Database["public"]["Tables"]["Comment"]["Row"];
}

export const CommentCard = ({ comment }: CommentCardProps) => {
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
                    //   openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                    //     const result = await handleCheckPassword(comment._id, password as string);
                    //     if (result) {
                    //       openModal(
                    //         <CommentForm id={comment._id} memoId={comment.memoId} />,
                    //         null,
                    //         "댓글 수정",
                    //         true
                    //       ).then((result) => {
                    //         if (result && onSubmit) {
                    //           onSubmit(true);
                    //         }
                    //       });
                    //     }
                    //   }); // 비밀번호 검증
                  }}
                >
                  <Text fz="1.5rem">수정</Text>
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    //   openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                    //     const result = await handleCheckPassword(comment._id, password as string);
                    //     if (result) {
                    //       openModal(
                    //         <Confirm
                    //           message="정말로 삭제하시겠어요? 😢"
                    //           yesCallback={async () => {
                    //             const result = await handleDelete(comment._id);
                    //             if (result && onSubmit) {
                    //               onSubmit(true);
                    //             }
                    //           }}
                    //           commonCallback={() => closeModal(null)}
                    //         />,
                    //         null,
                    //         "메모 삭제",
                    //         true
                    //       );
                    //     }
                    //   }); // 비밀번호 검증
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
              // onClick={() => handleClickLike(memo?._id as string)}
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
