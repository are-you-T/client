import { MBTIType, Question } from "@/@types";
import axiosRequest from "@/api";
import { mbtiTypeColor, typeColor } from "@/constants/MBTIColors";
import useCustomQuery from "@/hooks/useCustomQuery";
import useRouter from "@/hooks/useRouter";
import { ActionIcon, Badge, Blockquote, Card, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect } from "react";

const QuestionViewPage = () => {
  const { goBack, params } = useRouter();
  const { id } = params as { id: string };

  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }
  }, [id]);

  const { data: question } = useCustomQuery(["get-survey"], {
    method: "get",
    url: `/surveys/${id}`,
    queryFn: () => axiosRequest.requestAxios<Question>("get", `/surveys/${id}`),
    enabled: !!id,
  });

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      bg={typeColor[question?.mbtiType as MBTIType]}
      p="md"
      gap="md"
    >
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">Qusetion</Text>
        <Text>&nbsp;</Text>
      </Flex>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" gap="xs" align="center">
          <Text size="2rem">유형</Text>
          <Badge size="1.5rem" p="lg" color="dark">
            {question?.mbtiType}
          </Badge>
        </Flex>
        <Blockquote color="dark" p="sm">
          <Text size="1.5rem">{question?.subject}</Text>
        </Blockquote>

        {question?.answer.map((answer) => {
          return (
            <Card
              key={answer.content}
              shadow="sm"
              padding="md"
              radius="md"
              bg={mbtiTypeColor[answer.type]}
            >
              <Flex direction="column" gap="sm">
                <Flex justify="space-between">
                  <Text size="2rem">{answer.type}</Text>
                  <Text size="2rem">{answer.proportion}%</Text>
                </Flex>
                <Flex gap="xs">
                  <Text size="1.5rem">{answer.content}</Text>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default QuestionViewPage;
