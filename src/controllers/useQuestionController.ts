import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QuestionWithAnswersType } from "@/types";
import { useMemo } from "react";
import { useQuestionSearchStore } from "@/stores/useQuestionSearchStore";
import {
  getMBTITestQuestions,
  getQuestionByIdWithAnswers,
  getQuestionListWithAnswers,
  questionListQueryKey,
  questionMBTITestQueryKey,
  questionQueryKey,
} from "@/actions/question.actions";

const useQuestionController = () => {
  // 무한 목록 조회
  const subjects = useQuestionSearchStore((s) => s.subjects);
  const mbtiTypes = useQuestionSearchStore((s) => s.mbtiTypes);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [questionListQueryKey, subjects, mbtiTypes],
    queryFn: ({ pageParam = 0 }) =>
      getQuestionListWithAnswers({ pageParam, subjects, mbtiTypes }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // ✅ 데이터 평탄화 + id 기준 중복 제거
  const questionList: QuestionWithAnswersType[] = useMemo(() => {
    const flat = data?.pages.flatMap((p) => p.data) ?? [];
    return [...new Map(flat.map((it) => [it.id, it])).values()];
  }, [data]);

  // ✅ 단일 질문 조회 (React Query 사용)
  const getQuestion = (id: string) => {
    return useQuery({
      queryKey: [questionQueryKey, id],
      queryFn: () => getQuestionByIdWithAnswers(id),
      enabled: !!id, // id가 있을 때만 실행
    });
  };

  const mbtiTestQuestionList = () => {
    return useQuery({
      queryKey: [questionMBTITestQueryKey],
      queryFn: () => getMBTITestQuestions(),
      // 데이터 일관성: 항상 배열을 보장
      placeholderData: [] as QuestionWithAnswersType[],
    });
  };

  return {
    questionListData: {
      questionList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    getQuestion,
    mbtiTestQuestionList,
  };
};

export default useQuestionController;
