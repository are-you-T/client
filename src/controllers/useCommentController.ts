// hooks/useCommentController.ts
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCommentListById,
  commentQueryKey,
  createComment,
  softDeleteComment,
  checkCommentPassword,
  updateComment,
  getCommentById,
  incrementCommentLike,
} from "@/actions/comment.actions";
import { CommentType, MemoType } from "@/types";
import { memoListQueryKey, memoQueryKey } from "@/actions/memo.actions";
import { useState } from "react";

type InfinitePage<T> = {
  data: T[];
  nextPage?: number;
  isLastPage?: boolean;
};

const useCommentController = (memoId?: string) => {
  const queryClient = useQueryClient();

  // 댓글 무한 목록 (메모별로 분리)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [commentQueryKey, memoId],
    queryFn: ({ pageParam = 0 }) => getCommentListById(memoId as string, { pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!memoId,
  });

  // ✅ 평탄화 (중복 제거)
  const commentList: CommentType[] = [
    ...new Map((data?.pages.flatMap((p) => p.data) ?? []).map((c) => [c.id, c])).values(),
  ];

  // ✅ 단일 댓글 조회 (상세 키는 ["comment", id]로 분리)
  const getComment = (id: string) =>
    useQuery({
      queryKey: ["comment", id],
      queryFn: () => getCommentById(id),
      enabled: !!id,
    });

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

  // ✅ 댓글 작성
  const { mutate: createCommentMutation, isPending: isCreatingComment } = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await Promise.all([
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
        queryClient.invalidateQueries({ queryKey: [commentQueryKey, memoId] }),
      ]);
    },
  });

  // ✅ 댓글 수정
  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
      await Promise.all([
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
        queryClient.invalidateQueries({ queryKey: [commentQueryKey, memoId] }),
      ]);
    },
  });

  // ✅ 댓글 삭제 (Soft Delete) — 낙관 제거 + cmtCount -1 UX 반영
  const { mutate: deleteCommentMutate, isPending: isDeletingComment } = useMutation({
    mutationFn: softDeleteComment,
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

      // 메모 상세/목록의 cmtCount -1 (트리거가 실제로도 줄여줌, 여기선 UX)
      if (memoId) {
        const prevDetail = queryClient.getQueryData<MemoType>([memoQueryKey, memoId]);
        if (prevDetail) {
          queryClient.setQueryData<MemoType>([memoQueryKey, memoId], {
            ...prevDetail,
            cmtCount: Math.max((prevDetail.cmtCount ?? 0) - 1, 0),
          });
        }

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
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      const { prev } = ctx as {
        prev?: { pages: InfinitePage<CommentType>[]; pageParams: unknown[] };
      };
      if (prev) queryClient.setQueryData([commentQueryKey, memoId], prev);
    },
    onSettled: async () => {
      await Promise.all([
        memoId
          ? queryClient.invalidateQueries({ queryKey: [memoQueryKey, memoId] })
          : Promise.resolve(),
        queryClient.invalidateQueries({ queryKey: [memoListQueryKey] }),
        queryClient.invalidateQueries({ queryKey: [commentQueryKey, memoId] }),
      ]);
    },
  });

  // ✅ 댓글 비밀번호 검증
  const { mutateAsync: checkCommentPasswordMutate, isPending: isCheckingPassword } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      checkCommentPassword(id, password),
  });

  // ✅ 댓글 좋아요 증가 — 디테일/리스트 동시 낙관 반영
  const likeCommentMutation = useMutation({
    // ⬇️ 변수에 memoId, commentId 둘 다 받습니다
    mutationFn: ({ commentId }: { memoId: string; commentId: string }) =>
      incrementCommentLike(commentId),

    onMutate: async ({ memoId: mid, commentId }) => {
      addPending(commentId);

      // 관련 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["comment", commentId] }),
        queryClient.cancelQueries({ queryKey: [commentQueryKey, mid] }),
      ]);

      // 이전 스냅샷
      const prevDetail = queryClient.getQueryData<CommentType>(["comment", commentId]);
      const prevList = queryClient.getQueryData<{
        pages: InfinitePage<CommentType>[];
        pageParams: unknown[];
      }>([commentQueryKey, mid]);

      // 디테일 캐시 +1
      if (prevDetail) {
        queryClient.setQueryData<CommentType>(["comment", commentId], {
          ...prevDetail,
          likeCount: Math.max((prevDetail.likeCount ?? 0) + 1, 0),
        });
      }

      // 리스트 캐시 +1
      if (prevList) {
        const nextPages = prevList.pages.map((page) => ({
          ...page,
          data: page.data.map((c) =>
            c.id === commentId ? { ...c, likeCount: Math.max((c.likeCount ?? 0) + 1, 0) } : c
          ),
        }));
        queryClient.setQueryData([commentQueryKey, mid], {
          ...prevList,
          pages: nextPages,
        });
      }

      return { memoId: mid, commentId, prevDetail, prevList };
    },

    onError: (_e, _vars, ctx) => {
      if (!ctx) return;
      const {
        commentId,
        memoId: mid,
        prevDetail,
        prevList,
      } = ctx as {
        memoId: string;
        commentId: string;
        prevDetail?: CommentType;
        prevList?: { pages: InfinitePage<CommentType>[]; pageParams: unknown[] };
      };
      if (prevDetail) queryClient.setQueryData([commentQueryKey, commentId], prevDetail);
      if (prevList) queryClient.setQueryData([commentQueryKey, mid], prevList);
    },

    onSettled: async (_res, _err, vars) => {
      const { memoId: mid, commentId } = (vars ?? {}) as { memoId?: string; commentId?: string };
      if (memoId && commentId) removePending(commentId);

      await Promise.all([
        commentId
          ? queryClient.invalidateQueries({ queryKey: [commentQueryKey, commentId] })
          : Promise.resolve(),
        mid
          ? queryClient.invalidateQueries({ queryKey: [commentQueryKey, mid] })
          : Promise.resolve(),
      ]);
    },
  });

  // 외부에서 호출할 핸들러
  const likeComment = (memoId: string, commentId: string) =>
    likeCommentMutation.mutate({ memoId, commentId });

  return {
    commentListData: {
      commentList,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    getComment,
    // 작성/수정/삭제
    isCreatingComment,
    createComment: createCommentMutation,
    updateComment: updateCommentMutate,
    isDeletingComment,
    deleteComment: deleteCommentMutate,
    // 좋아요
    likeComment,
    isLiking,
    // 비밀번호 검증
    isCheckingPassword,
    passwordValidate: checkCommentPasswordMutate,
  };
};

export default useCommentController;
