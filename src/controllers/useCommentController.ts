import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentListById,
  commentQueryKey,
  createComment,
  softDeleteComment,
  checkGuestBookPassword,
} from "@/actions/comment.actions";
import { CommentType, MemoType } from "@/types";
import { memoListQueryKey, memoQueryKey } from "@/actions/memo.actions";

const useCommentController = (memoId?: string) => {
  const queryClient = useQueryClient();

  type InfinitePage<T> = {
    data: T[];
    nextPage?: number;
    isLastPage?: boolean;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    // 메모별로 코멘트 캐시를 분리하기 위해 memoId를 키에 포함
    queryKey: [commentQueryKey, memoId],
    queryFn: ({ pageParam = 0 }) => getCommentListById(memoId as string, { pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!memoId,
  });

  // ✅ 데이터 평탄화, id를 기준으로 중복 제거
  const commentList = [
    ...new Map(
      (data?.pages.flatMap((page) => page.data) ?? []).map((item) => [item.id, item])
    ).values(),
  ];

  // ✅ 댓글 작성
  const { mutate: createCommentMutation, isPending: isCreatingComment } = useMutation({
    mutationFn: createComment,
    // 성공 시 관련 쿼리들을 즉시 재조회
    onSuccess: async () => {
      await Promise.all([
        // 상세 메모 (댓글 수 등 동기화)
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        // 메모 목록 (카드의 댓글 수 등 반영)
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
        // 현재 메모의 댓글 목록 재조회
        queryClient.invalidateQueries({ queryKey: [commentQueryKey, memoId] }),
      ]);
    },
  });

  // ✅ 댓글 삭제 (Soft Delete)
  const { mutate: deleteCommentMutation, isPending: isDeletingComment } = useMutation({
    mutationFn: softDeleteComment,
    // 낙관적 업데이트: 목록에서 해당 댓글 제거
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({ queryKey: [commentQueryKey, memoId] });

      const prev = queryClient.getQueryData<{
        pages: InfinitePage<CommentType>[];
        pageParams: unknown[];
      }>([commentQueryKey, memoId]);

      if (prev) {
        const nextPages = prev.pages.map((page) => ({
          ...page,
          data: page.data.filter((item) => item.id !== commentId),
        }));
        queryClient.setQueryData([commentQueryKey, memoId], {
          ...prev,
          pages: nextPages,
        });
      }

      // 메모 상세의 댓글 수 -1
      if (memoId) {
        const prevDetail = queryClient.getQueryData<MemoType>([memoQueryKey, memoId]);
        if (prevDetail) {
          queryClient.setQueryData<MemoType>([memoQueryKey, memoId], {
            ...prevDetail,
            cmtCount: Math.max((prevDetail.cmtCount ?? 0) - 1, 0),
          });
        }

        // 메모 목록의 댓글 수 -1
        const prevList = queryClient.getQueryData<{
          pages: InfinitePage<MemoType>[];
          pageParams: unknown[];
        }>([memoListQueryKey]);
        if (prevList) {
          const nextPagesForList = prevList.pages.map((page) => ({
            ...page,
            data: page.data.map((item) =>
              item.id === memoId
                ? { ...item, cmtCount: Math.max((item.cmtCount ?? 0) - 1, 0) }
                : item
            ),
          }));
          queryClient.setQueryData([memoListQueryKey], {
            ...prevList,
            pages: nextPagesForList,
          });
        }
      }

      return { prev } as const;
    },
    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      const { prev } = ctx as {
        prev?: { pages: InfinitePage<CommentType>[]; pageParams: unknown[] };
      };
      if (prev) queryClient.setQueryData([commentQueryKey, memoId], prev);
    },
    // 성공/실패 무관하게 정확한 데이터 동기화
    onSettled: async () => {
      await Promise.all([
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
        // 강제 재조회로 즉시 최신화
        queryClient.refetchQueries({ queryKey: [commentQueryKey, memoId] }),
      ]);
    },
  });

  // ✅ 댓글 비밀번호 검증
  const { mutateAsync: checkCommentPassword, isPending: isCheckingPassword } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      checkGuestBookPassword(id, password),
  });

  return {
    commentListData: {
      commentList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    isCreatingComment,
    createComment: createCommentMutation,
    isDeletingComment,
    deleteComment: deleteCommentMutation,
    // 비밀번호 검증
    isCheckingPassword,
    checkCommentPassword,
  };
};

export default useCommentController;
