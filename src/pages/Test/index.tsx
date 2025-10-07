import useQuestionController from "@/controllers/useQuestionController";
import { AnswerType, MbtiType } from "@/types";
import useRouter from "@/hooks/useRouter";
import { calculateMbtiProportion, determineMBTI } from "@/utils/mbtiCalculate";
import useStatController from "@/controllers/useStatController";
import { Button, Flex, Progress, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconArrowRight, IconChecklist } from "@tabler/icons-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface SelectedAnswers extends AnswerType {
  mbtiType: MbtiType;
}

const TestPage = () => {
  const [seq, setSeq] = useState(0);
  const { navigateTo } = useRouter();
  const form = useForm<{ answers: SelectedAnswers[] }>({
    initialValues: {
      answers: [],
    },
  });
  const { mbtiTestQuestionList } = useQuestionController();
  const { incrementStatCount } = useStatController();
  const { mutate: incrementCount } = incrementStatCount();
  // 데이터가 undefined/null이어도 항상 배열을 보장
  const { data: questions, isLoading } = mbtiTestQuestionList();

  // 로딩 중이고 캐시/데이터가 비어있을 때 간단한 플레이스홀더
  if (!questions || isLoading) {
    return (
      <Flex direction="column" w="100%" gap="sm" p="md" justify="center" bg="dark">
        <Text c="white">질문을 불러오는 중입니다...</Text>
      </Flex>
    );
  }

  const handleSetAnswer = (mbtiType: string, answer: AnswerType, index: number) => {
    // 해당하는 index에 선택된 데이터가 있다면 요소를 교체하기 위해 해당 index에 대한 요소를 제거한다.
    const isSelectedAnswer = form.values.answers.length !== index;

    if (isSelectedAnswer) {
      form.removeListItem("answers", index);
    }

    // 해당하는 index에 insertListItem으로 요소를 추가한다.
    form.insertListItem("answers", { ...answer, mbtiType }, index);
  };

  const onSubmit = () => {
    const proportions = calculateMbtiProportion(form.values.answers);
    const mbtiType = determineMBTI(proportions);

    // 먼저 MBTI 통계 count 증가 후 결과 페이지로 이동
    incrementCount(mbtiType, {
      onSuccess: () => {
        navigateTo(`/result/${mbtiType}`, { resultData: proportions });
      },
    });
  };

  return (
    <Flex direction="column" w="100%" gap="sm" p="md" justify="space-between" bg="dark">
      {questions.map((question, index) => {
        return (
          index === seq && (
            <Fragment key={question.id}>
              <Flex direction="column" gap="sm">
                <Text size="1.5rem" c="white">
                  # {(index + 1).toString().padStart(2, "0")}
                </Text>
                <Text size="1.5rem" c="white">
                  {question.subject}
                </Text>
              </Flex>
              <Flex direction="column" gap="lg" p="sm">
                {question.Answer.map((answer) => {
                  const isSelected = answer.content === form.values.answers[index]?.content;

                  return (
                    <Button
                      key={answer.id ?? answer.content + String(answer.proportion)}
                      variant={isSelected ? "filled" : "outline"}
                      color="violet"
                      bg={isSelected ? "" : "white"}
                      w="100%"
                      mih="8rem"
                      p="sm"
                      onClick={() => {
                        handleSetAnswer(question.mbtiType, answer, index);

                        if (index < questions.length - 1) {
                          setSeq((_) => index + 1);
                        }
                      }}
                    >
                      <Text style={{ whiteSpace: "normal" }}>{answer.content}</Text>
                    </Button>
                  );
                })}
              </Flex>
              <Flex w="100%" justify="space-between" p="sm">
                <Button
                  color="violet"
                  leftSection={<IconArrowLeft />}
                  disabled={!index}
                  onClick={() => setSeq((_) => index - 1)}
                >
                  이전
                </Button>
                {index < questions.length - 1 && (
                  <Button
                    color="violet"
                    rightSection={<IconArrowRight />}
                    onClick={() => setSeq((_) => index + 1)}
                    disabled={index === form.values.answers.length}
                  >
                    다음
                  </Button>
                )}
                {index === questions.length - 1 && (
                  <Button
                    color="teal"
                    rightSection={<IconChecklist />}
                    onClick={() => onSubmit()}
                    disabled={form.values.answers.length !== questions.length}
                  >
                    제출
                  </Button>
                )}
              </Flex>
              <Flex direction="column" gap="sm" pb="xl">
                <Text size="1rem" c="white" ta="end">
                  {seq + 1} / 16
                </Text>
                <Progress color="violet" value={((seq + 1) / 16) * 100} />
              </Flex>
            </Fragment>
          )
        );
      })}
    </Flex>
  );
};

export default TestPage;
