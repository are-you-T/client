import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentListById, commentQueryKey } from "@/actions/comment.actions";

const useMemoController = (memoId: string) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [commentQueryKey],
    queryFn: ({ pageParam = 0 }) => getCommentListById(memoId, { pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // ✅ 데이터 평탄화, id를 기준으로 중복 제거
  const memoList = [
    ...new Map(
      (data?.pages.flatMap((page) => page.data) ?? []).map((item) => [item.id, item])
    ).values(),
  ];

  return {
    memoListData: {
      memoList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  };
};

export default useMemoController;
