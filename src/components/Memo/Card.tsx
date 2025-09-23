import useRouter from "@/hooks/useRouter";
import dayjs from "dayjs";
import { Card, Flex, Badge, Text, ButtonGroup, Button } from "@mantine/core";
import { IconHeart, IconMessage2 } from "@tabler/icons-react";
import { MemoType } from "@/types";
import useMemoController from "@/controllers/useMemoController";

interface MemoCardProps {
  memo: MemoType;
}

export const MemoCard = ({ memo }: MemoCardProps) => {
  const { likeMemo, isLiking } = useMemoController();
  const { navigateTo } = useRouter();

  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      bg={memo.cardColor}
      h="12rem"
      onClick={() => {
        if (memo.id) navigateTo(`/memo/${memo.id}`);
      }}
    >
      <Flex direction="column" gap="xs" justify="space-between" h="100%">
        <Flex direction="column" gap="xs">
          <Flex justify="space-between">
            <Text fw={600}>{memo.title}</Text>
            <Badge color="dark">{memo.mbtiType}</Badge>
          </Flex>
          <Text lineClamp={3} fz="0.875rem">
            {memo.content}
          </Text>
        </Flex>
        <Flex w="100%" justify="space-between" align="flex-end">
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
              {memo.likeCount}
            </Button>
            <Button size="xs" variant="subtle" leftSection={<IconMessage2 />} color="dark">
              {memo.cmtCount}
            </Button>
          </ButtonGroup>
          <Flex direction="column" justify="flex-end" align="flex-end">
            <Text fz="sm">{memo.nickname}</Text>
            <Text fz="sm">{dayjs(memo.created_at).format("YYYY-MM-DD HH:mm").toString()}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
