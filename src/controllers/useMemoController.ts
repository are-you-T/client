import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkMemoPassword,
  createMemo,
  getMemoById,
  getMemoList,
  incrementMemoLike,
  memoListQueryKey,
  memoQueryKey,
  softDeleteMemo,
  updateMemo,
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

  // ✅ 단일 메모 조회 (React Query 사용)
  const getMemo = (id: string) => {
    return useQuery({
      queryKey: [memoQueryKey, id],
      queryFn: () => getMemoById(id),
      enabled: !!id, // id가 있을 때만 실행
    });
  };

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

  const { mutate: createMemoMutate } = useMutation({
    mutationFn: createMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [memoQueryKey] }); // 리스트 자동 갱신
      queryClient.invalidateQueries({ queryKey: [memoListQueryKey] });
    },
  });

  const { mutate: updateMemoMutate } = useMutation({
    mutationFn: updateMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [memoQueryKey] }); // 리스트 자동 갱신
    },
  });

  // ✅ 메모 소프트딜리트 (연쇄로 댓글 soft-delete 트리거 작동)
  const { mutate: softDeleteMemoMutate } = useMutation({
    mutationFn: (memoId: string) => softDeleteMemo(memoId),
    onMutate: async (memoId) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [memoQueryKey, memoId] }),
        queryClient.cancelQueries({ queryKey: [memoListQueryKey] }),
      ]);

      const prevDetail = queryClient.getQueryData<MemoType>([memoQueryKey, memoId]);
      const prevList = queryClient.getQueryData<{
        pages: InfinitePage<MemoType>[];
        pageParams: unknown[];
      }>([memoListQueryKey]);

      // UX 낙관 반영: 메모 삭제 표시 + 댓글수 0
      if (prevDetail) {
        queryClient.setQueryData<MemoType>([memoQueryKey, memoId], {
          ...prevDetail,
          deleteYn: true as any,
          cmtCount: 0 as any,
        });
      }
      if (prevList) {
        const nextPages = prevList.pages.map((p) => ({
          ...p,
          data: p.data.map((m) =>
            m.id === memoId ? { ...m, deleteYn: true as any, cmtCount: 0 as any } : m
          ),
        }));
        queryClient.setQueryData([memoListQueryKey], { ...prevList, pages: nextPages });
      }

      return { memoId, prevDetail, prevList };
    },
    onError: (_e, _vars, ctx) => {
      if (!ctx) return;
      const { memoId, prevDetail, prevList } = ctx;
      if (prevDetail) queryClient.setQueryData([memoQueryKey, memoId], prevDetail);
      if (prevList) queryClient.setQueryData([memoListQueryKey], prevList);
    },
    onSettled: (_res, _err, memoId) => {
      if (!memoId) return;
      queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] });
      queryClient.invalidateQueries({ queryKey: [memoListQueryKey] });
    },
  });

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

  // ✅ 댓글 비밀번호 검증
  const { mutateAsync: checkMemoPasswordMutate, isPending: isCheckingPassword } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      checkMemoPassword(id, password),
  });

  return {
    memoListData: {
      memoList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    getMemo,
    likeMemo,
    isLiking,
    createMemo: createMemoMutate,
    updateMemo: updateMemoMutate,
    deleteMemo: softDeleteMemoMutate,
    // 비밀번호 검증
    isCheckingPassword,
    passwordValidate: checkMemoPasswordMutate,
  };
};

export default useMemoController;
