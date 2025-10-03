import { mbtiTypeColor, typeColor } from "@/constants/MBTIColors";
import useQuestionController from "@/controllers/useQuestionController";
import useRouter from "@/hooks/useRouter";
import { ActionIcon, Badge, Blockquote, Card, Flex, Loader, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect } from "react";

const QuestionViewPage = () => {
  const { getQuestion } = useQuestionController();
  const { goBack, params } = useRouter();
  const { id } = params as { id: string };
  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }
  }, [id]);

  const { data: question, isLoading } = getQuestion(id);

  // 로딩 중에는 페이지 본문을 렌더하지 않음
  if (isLoading) {
    return (
      <Flex align="center" justify="center" w="100%" h="60vh">
        <Loader />
      </Flex>
    );
  }

  // 문항이 존재하지 않으면 페이지를 표시하지 않음 (간단한 안내와 뒤로가기만 제공)
  if (!question) {
    return (
      <Flex direction="column" w="100%" p="md" gap="md">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.1rem">해당 문항을 찾을 수 없어요.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" bg={typeColor[question.mbtiType]} p="md" gap="2rem">
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">Qusetion</Text>
        <Text>&nbsp;</Text>
      </Flex>
      <Flex direction="column" gap="2rem">
        <Flex justify="space-between" gap="xs" align="center">
          <Text size="2rem">유형</Text>
          <Badge size="1.5rem" p="lg" color="dark">
            {question.mbtiType}
          </Badge>
        </Flex>
        <Blockquote color="dark" p="sm">
          <Text size="1.5rem">{question.subject}</Text>
        </Blockquote>

        {question?.Answer.map((answer) => {
          const letterByDim = {
            energy: answer.energy,
            awareness: answer.awareness,
            judgement: answer.judgement,
            life: answer.life,
          } as const;
          const letter = letterByDim[answer.dimension];

          if (!letter) return null;

          return (
            <Card
              key={answer.content}
              shadow="sm"
              padding="md"
              radius="md"
              bg={mbtiTypeColor[letter]}
            >
              <Flex direction="column" gap="sm">
                <Flex justify="space-between">
                  <Text size="2rem">{letter}</Text>
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
