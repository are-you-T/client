import { Flex, Text, Loader, Overlay, ActionIcon, Badge } from "@mantine/core";
import { useEffect } from "react";
import { QuestionCard } from "@/components/Question/Card";
import { useInViewport } from "@mantine/hooks";
import useQuestionController from "@/controllers/useQuestionController";
import { QuestionWithAnswersType } from "@/types";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useModal } from "@/hooks/useModal";
import { SearchForm as QuestionSearchForm } from "@/components/Question/SearchForm";
import { useQuestionSearchStore } from "@/stores/useQuestionSearchStore";
import { MBTI_TYPES_VALUE, MBTI_TYPES_OPTIONS } from "@/constants/MBTIOptions";

const QuestionPage = () => {
  const viewport = useInViewport();
  const { ref: inViewportRef, inViewport } = viewport;
  const { openModal } = useModal();
  const { subjects, mbtiTypes, addSubject, addMbtiType, removeSubject, removeMbtiType } =
    useQuestionSearchStore();

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
          <Flex gap="sm">
            <ActionIcon
              radius="100%"
              size="3rem"
              color="cyan"
              onClick={async () => {
                const result = (await openModal(
                  <QuestionSearchForm />,
                  null,
                  "질문 검색",
                  true
                )) as { subjects?: string[]; mbtiTypes?: string[] } | null;
                if (result) {
                  (result.subjects ?? []).forEach((s) => addSubject(s));
                  (result.mbtiTypes ?? [])
                    .filter((v): v is typeof MBTI_TYPES_OPTIONS[number] =>
                      (MBTI_TYPES_OPTIONS as string[]).includes(v as string)
                    )
                    .forEach((t) => addMbtiType(t as any));
                }
              }}
            >
              <IconSearch size="1.5rem" />
            </ActionIcon>
          </Flex>
        </Flex>
      </Flex>
      {/* 선택된 검색 조건 뱃지 */}
      <Flex gap="sm" wrap="wrap" px="xs">
        {subjects.map((s) => (
          <Badge
            key={`subject-${s}`}
            color="cyan"
            size="lg"
            variant="filled"
            rightSection={
              <ActionIcon variant="subtle" size="sm" color="white" onClick={() => removeSubject(s)}>
                <IconX />
              </ActionIcon>
            }
          >
            {s}
          </Badge>
        ))}
        {mbtiTypes.map((t) => (
          <Badge
            key={`type-${t}`}
            color={MBTI_TYPES_VALUE[t]?.color || "cyan"}
            size="lg"
            variant="filled"
            rightSection={
              <ActionIcon
                variant="subtle"
                size="sm"
                color="white"
                onClick={() => removeMbtiType(t as any)}
              >
                <IconX />
              </ActionIcon>
            }
          >
            {MBTI_TYPES_VALUE[t]?.label || t}
          </Badge>
        ))}
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
