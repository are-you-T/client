import { mbtiTypeColor, typeColor } from "@/constants/MBTIColors";
import useRouter from "@/hooks/useRouter";
import { QuestionWithAnswersType } from "@/types";
import { Card, Flex, Badge, Progress, Text } from "@mantine/core";

interface QuestionCardProps {
  question: QuestionWithAnswersType;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  const { navigateTo } = useRouter();

  return (
    <Card
      key={question.id}
      shadow="sm"
      padding="md"
      radius="md"
      bg={typeColor[question.mbtiType]}
      h="100%"
      //   onClick={() => {
      //     navigateTo(`/question/${question._id}`);
      //   }}
    >
      <Flex direction="column" justify="space-between" gap="xs" h="8rem">
        <Flex direction="column" gap="xs">
          <Badge color="dark">{question.mbtiType}</Badge>
          <Text size="md" lineClamp={2}>
            {question.subject}
          </Text>
        </Flex>
        <Progress.Root size="2rem">
          {question.Answer.map((answer) => {
            const letterByDim = {
              energy: answer.energy,
              awareness: answer.awareness,
              judgement: answer.judgement,
              life: answer.life,
            } as const;
            const letter = letterByDim[answer.dimension];

            return (
              <Progress.Section
                key={answer.content}
                value={answer.proportion}
                color={letter ? mbtiTypeColor[letter] : undefined}
              >
                <Progress.Label>{letter}</Progress.Label>
              </Progress.Section>
            );
          })}
        </Progress.Root>
      </Flex>
    </Card>
  );
};
