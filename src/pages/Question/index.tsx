import { Flex, Text, Loader, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { QuestionCard } from "@/components/Question/Card";
import { useInViewport } from "@mantine/hooks";
import useQuestionController from "@/controllers/useQuestionController";
import { QuestionWithAnswersType } from "@/types";

const QuestionPage = () => {
  const viewport = useInViewport();
  const { ref: inViewportRef, inViewport } = viewport;

  const { questionListData } = useQuestionController();
  const { questionList, fetchNextPage, hasNextPage, isFetchingNextPage } = questionListData;

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
            QuestBTI
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%" p="md" gap="md" justify="center">
        {questionList.map((question: QuestionWithAnswersType) => {
          return <QuestionCard key={question.id} question={question} />;
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
        {!hasNextPage && questionList && questionList.length > 0 && (
          <Text ta="center" c="white">
            페이지의 끝!
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default QuestionPage;
