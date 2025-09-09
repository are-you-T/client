import useRouter from "@/hooks/useRouter";
import dayjs from "dayjs";
import { Card, Flex, Group, Badge, Text, ButtonGroup, Button } from "@mantine/core";
import { IconHeart, IconMessage2 } from "@tabler/icons-react";
import { customThemeColor } from "@/styles/color";
import { MemoCardDto } from "@/pages/Memo";
// import { findColorArray } from "@/utils/findColor";

interface MemoCardProps {
  memo: MemoCardDto;
}

export const MemoCard = ({ memo }: MemoCardProps) => {
  const { navigateTo } = useRouter();
  //   const bgColor = findColorArray(memo?.cardColor);

  //   const { mutate } = useCustomMutation<MemoLikeResponse>(["get-memos"], {
  //     method: "patch",
  //   });

  //   const handleClickLike = (id: string) => {
  //     mutate(
  //       {
  //         url: `/memos/${id}/like`, // 동적 URL
  //       },
  //       {
  //         onSuccess: (data: MemoLikeResponse) => {
  //           notifications.show({
  //             title: (
  //               <Flex direction="column">
  //                 <Text lineClamp={1} fw={600}>
  //                   {memo?.title}
  //                 </Text>
  //                 <Text>글을 좋아합니다.</Text>
  //               </Flex>
  //             ),
  //             message: <Text>공감이 {data.likeCount}개가 되었어요! 🥰</Text>,
  //             color: "blue",
  //           });
  //         },
  //         onError: (error: Error) => {
  //           notifications.show({
  //             title: "공감 실패",
  //             message: "공감 클릭 중 오류가 발생했어요. 😥",
  //             color: "red",
  //           });
  //           setError(error);
  //         },
  //       }
  //     );
  //   };

  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      bg={customThemeColor.bgColor}
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
              //   onClick={() => handleClickLike(memo._id)}
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
