import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMemoList,
  incrementMemoLike,
  memoListQueryKey,
  memoQueryKey,
} from "@/actions/memo.actions";
import { MemoType } from "@/types";
import { useMemo, useState } from "react";

type InfinitePage<T> = {
  data: T[];
  nextPage?: number;
  isLastPage?: boolean;
};

const useMemoController = () => {
  const queryClient = useQueryClient();

  // 무한 목록 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [memoListQueryKey],
    queryFn: ({ pageParam = 0 }) => getMemoList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // ✅ 데이터 평탄화 + id 기준 중복 제거
  const memoList: MemoType[] = useMemo(() => {
    const flat = data?.pages.flatMap((p) => p.data) ?? [];
    return [...new Map(flat.map((it) => [it.id, it])).values()];
  }, [data]);

  // 항목별 좋아요 진행 상태 관리
  const [pendingLikeIds, setPendingLikeIds] = useState<Set<string>>(new Set());
  const addPending = (id: string) => setPendingLikeIds((s) => new Set(s).add(id));
  const removePending = (id: string) =>
    setPendingLikeIds((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  const isLiking = (id: string) => pendingLikeIds.has(id);

  // 좋아요 증가 mutation (메모 id를 변수로 받음)
  const likeMutation = useMutation({
    mutationFn: ({ memoId }: { memoId: string }) => incrementMemoLike(memoId),

    // 낙관적 업데이트
    onMutate: async ({ memoId }) => {
      addPending(memoId);

      // 관련 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [memoQueryKey, memoId] }),
        queryClient.cancelQueries({ queryKey: [memoListQueryKey] }),
      ]);

      // 이전 스냅샷 저장(롤백용)
      const prevDetail = queryClient.getQueryData<MemoType>([memoQueryKey, memoId]);
      const prevList = queryClient.getQueryData<{
        pages: InfinitePage<MemoType>[];
        pageParams: unknown[];
      }>([memoListQueryKey]);

      // 상세 캐시 +1
      if (prevDetail) {
        queryClient.setQueryData<MemoType>([memoQueryKey, memoId], {
          ...prevDetail,
          likeCount: Math.max((prevDetail.likeCount ?? 0) + 1, 0),
        });
      }

      // 무한목록 캐시 +1
      if (prevList) {
        const nextPages = prevList.pages.map((page) => ({
          ...page,
          data: page.data.map((item) =>
            item.id === memoId
              ? { ...item, likeCount: Math.max((item.likeCount ?? 0) + 1, 0) }
              : item
          ),
        }));
        queryClient.setQueryData([memoListQueryKey], {
          ...prevList,
          pages: nextPages,
        });
      }

      return { memoId, prevDetail, prevList };
    },

    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      const { memoId, prevDetail, prevList } = ctx;
      if (prevDetail) queryClient.setQueryData([memoQueryKey, memoId], prevDetail);
      if (prevList) queryClient.setQueryData([memoListQueryKey], prevList);
    },

    // 성공/실패 무관 동기화
    onSettled: async (_res, _err, vars) => {
      const memoId = vars?.memoId;
      if (memoId) removePending(memoId);

      await Promise.all([
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
      ]);
    },
  });

  // 외부에서 호출할 핸들러
  const likeMemo = (memoId: string) => likeMutation.mutate({ memoId });

  return {
    memoListData: {
      memoList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    likeMemo,
    isLiking,
  };
};

export default useMemoController;
