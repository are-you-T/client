import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QuestionWithAnswersType } from "@/types";
import { useMemo } from "react";
import {
  getQuestionByIdWithAnswers,
  getQuestionListWithAnswers,
  questionListQueryKey,
  questionQueryKey,
} from "@/actions/question.actions";

type InfinitePage<T> = {
  data: T[];
  nextPage?: number;
  isLastPage?: boolean;
};

const useQuestionController = () => {
  // 무한 목록 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [questionListQueryKey],
    queryFn: ({ pageParam = 0 }) => getQuestionListWithAnswers({ pageParam }),
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

  return {
    questionListData: {
      questionList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    getQuestion,
  };
};

export default useQuestionController;
