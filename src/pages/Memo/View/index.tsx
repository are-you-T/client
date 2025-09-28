import { getMemoById, memoQueryKey } from "@/actions/memo.actions";
import { CommentCard } from "@/components/Memo/CommentCard";
import { CommentNote } from "@/components/Memo/CommentNote";
import { Note } from "@/components/Memo/Note";
import useCommentController from "@/controllers/useCommentController";
import useMemoController from "@/controllers/useMemoController";
import { useModal } from "@/hooks/useModal";
import useRouter from "@/hooks/useRouter";
import { setDayjsFormatString } from "@/utils/formatDate";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  Loader,
} from "@mantine/core";
import { IconArrowLeft, IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MemoType } from "@/types";
import { PasswordForm } from "@/components/Common/PasswordForm";
import { notifications } from "@mantine/notifications";
import { Confirm } from "@/components/Common/Confirm";

const MemoViewPage = () => {
  const { likeMemo, isLiking, passwordValidate, deleteMemo } = useMemoController();
  const { goBack, params } = useRouter();
  const { id } = params as { id: string };
  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }
  }, [id]);

  // const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal, closeModal } = useModal();

  const { data: memo, isLoading } = useQuery<MemoType | null>({
    queryKey: [memoQueryKey, id],
    queryFn: () => getMemoById(id),
    enabled: !!id,
  });

  const { commentListData } = useCommentController(memo?.id);

  // 로딩 중에는 페이지 본문을 렌더하지 않음
  if (isLoading) {
    return (
      <Flex align="center" justify="center" w="100%" h="60vh">
        <Loader />
      </Flex>
    );
  }

  // 메모가 존재하지 않으면 페이지를 표시하지 않음 (간단한 안내와 뒤로가기만 제공)
  if (!memo) {
    return (
      <Flex direction="column" w="100%" p="md" gap="md">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.1rem">해당 메모를 찾을 수 없어요.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" bg={memo?.cardColor ?? "#FFFFFF"} p="md" gap="lg">
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">{memo?.mbtiType}</Text>
        <Menu shadow="md" withArrow withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                  if (password) {
                    const result = await passwordValidate({
                      id: memo.id,
                      password: password as string,
                    });
                    if (result) {
                      openModal(<Note id={id} />, null, "메모 수정", true);
                    } else {
                      notifications.show({
                        title: "메모 비밀번호 검증",
                        message: "메모 비밀번호가 일치하지 않습니다.",
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
                      id: memo.id,
                      password: password as string,
                    });
                    if (result) {
                      openModal(
                        <Confirm
                          message="정말로 삭제하시겠어요? 😢"
                          yesCallback={async () => {
                            await deleteMemo(memo.id);
                            notifications.show({
                              title: "메모 삭제 완료",
                              message: "메모가 삭제되었습니다.",
                              color: "blue",
                            });
                            goBack();
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
                        title: "메모 비밀번호 검증",
                        message: "메모 비밀번호가 일치하지 않습니다.",
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
      </Flex>
      <Card shadow="lg" padding="lg" radius="md" bg="#FFFFFF" w="100%" h="30rem">
        <Flex direction="column" h="100%" gap="sm" justify="space-between">
          <Flex direction="column" gap="md">
            <Group justify="space-between">
              <Text fw={600}>{memo?.title}</Text>
            </Group>
            <Text size="md" h="100%">
              {memo?.content}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <ButtonGroup>
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconHeart />}
                color="dark"
                loading={isLiking(memo.id)}
                disabled={isLiking(memo.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  likeMemo(memo.id);
                }}
              >
                {memo?.likeCount}
              </Button>
            </ButtonGroup>
            <Text ta="end">{setDayjsFormatString(memo?.created_at)}</Text>
          </Flex>
        </Flex>
      </Card>
      <Flex direction="column" w="100%" gap="xs">
        <Flex w="100%" justify="space-between" gap="xs" align="center">
          <Flex gap="xs">
            <Text fz="lg">댓글</Text>
            <IconMessage2 />
            <Text fz="lg">[{memo?.cmtCount}]</Text>
          </Flex>
          <Button
            onClick={() => {
              openModal(<CommentNote memoId={memo.id} />, null, "댓글 작성", true);
            }}
          >
            작성
          </Button>
        </Flex>
        {!memo?.cmtCount ? (
          <Text>댓글이 존재하지 않습니다.</Text>
        ) : (
          <Flex direction="column">
            {commentListData.commentList.map((comment) => {
              return <CommentCard key={comment.id} comment={comment} />;
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default MemoViewPage;
