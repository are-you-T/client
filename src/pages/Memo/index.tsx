import { ActionIcon, Flex, Text, Loader, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { MemoCard } from "@/components/Memo/Card";

const MemoPage = () => {
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
            <ActionIcon radius="100%" size="4rem" onClick={() => {}}>
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
        {/* <MemoCard key={data._id} memo={data} />; */}
        <MemoCard />
        <MemoCard />
        <MemoCard />
        <MemoCard />
        <MemoCard />
        <MemoCard />
        <Text ta="center" c="white">
          페이지의 끝!
        </Text>
      </Flex>
    </Flex>
  );
};

export default MemoPage;
