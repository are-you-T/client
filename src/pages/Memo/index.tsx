import { ActionIcon, Flex, Text, Badge, Loader, Overlay } from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { MemoCard } from "@/components/Memo/Card";
import { useInViewport } from "@mantine/hooks";
import { useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Note } from "@/components/Memo/Note";
import { MemoType } from "@/types";
import useMemoController from "@/controllers/useMemoController";

const MemoPage = () => {
  const { openModal } = useModal();
  const viewport = useInViewport();
  const { ref: inViewportRef, inViewport } = viewport;

  const { memoListData } = useMemoController();
  const { memoList, fetchNextPage, hasNextPage, isFetchingNextPage } = memoListData;

  useEffect(() => {
    if (inViewport && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [inViewport, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Flex direction="column" w="100%" bg="dark">
      {/* 헤더 영역은 고정되도록 하고 싶긴 함 sticky? */}
      <Flex
        p="xs"
        w="100%"
        direction="column"
        bg="dark"
        pos="sticky"
        top={72}
        style={{
          zIndex: 1,
        }}
      >
        <Flex w="100%" justify="space-between" align="center">
          <Text size="2rem" c="white">
            MemoBTI
          </Text>
          <Flex gap="sm">
            <ActionIcon radius="100%" size="4rem" color="cyan" onClick={() => {}}>
              <IconSearch size="2rem" />
            </ActionIcon>
            <ActionIcon
              radius="100%"
              size="4rem"
              onClick={() => {
                openModal(<Note />, null, "메모 작성", true);
              }}
            >
              <IconPlus size="2rem" />
            </ActionIcon>
          </Flex>
        </Flex>

        <Flex gap="sm" wrap="wrap">
          <Badge
            color="cyan"
            size="lg"
            variant="filled"
            rightSection={
              <ActionIcon variant="subtle" size="sm" color="white" onClick={() => {}}>
                <IconX />
              </ActionIcon>
            }
          >
            {/* {`${FIELD_LABELS[item.field]}: ${item.text}`} */}
          </Badge>
        </Flex>
      </Flex>

      <Flex direction="column" w="100%" p="md" gap="md" justify="center">
        {memoList.map((memo: MemoType) => {
          return <MemoCard key={memo.id} memo={memo} />;
        })}
        {/* 무한스크롤 트리거 영역 */}
        {hasNextPage && (
          <div data-testid="infinite-sentinel" ref={inViewportRef} style={{ height: 1 }} />
        )}
        {/* 로딩 중 표시용 버튼 */}
        {isFetchingNextPage && (
          <Flex
            w="100%"
            h="100%"
            style={{ zIndex: 1000 }}
            justify="center"
            align="center"
            pos="fixed"
            top={0}
            left={0}
          >
            <Loader size="xl" />
            <Overlay color="#FFFFFF" backgroundOpacity={0.5} />
          </Flex>
        )}
        {!hasNextPage && memoList && memoList.length > 0 && (
          <Text ta="center" c="white">
            페이지의 끝!
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default MemoPage;
