import { supabase } from "@/supabaseClient";
import { CommentType } from "@/types";
import { Database } from "@/types/supabase";
import { compareHashPassword, hashPassword } from "@/utils/password";

export const commentQueryKey = "comment";
// Comment List 가져오기
export const getCommentListById = async (
  memoId: string,
  { pageParam = 0 }: { pageParam: number }
) => {
  const limit = 5;
  const offset = pageParam * limit;

  // ✅ 데이터 + 전체 count 조회
  const { data, error, count } = await supabase
    .from("Comment")
    .select("*", { count: "exact" })
    .eq("memoId", memoId)
    .eq("deleteYn", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  const totalRecords = count ?? 0;
  const fetchedDataLength = data?.length ?? 0;
  const isLastPage = offset + fetchedDataLength >= totalRecords;

  return {
    data: data ?? [],
    nextPage: !isLastPage ? pageParam + 1 : undefined,
    isLastPage,
  };
};

export const getCommentById = async (id: string) => {
  const { data, error } = await supabase
    .from("Comment")
    .select("*")
    .eq("id", id)
    .is("deleteYn", false)
    .maybeSingle(); // ✅ 데이터가 없을 경우 null 반환

  if (error) {
    console.error("Error fetching memo entry:", error);
    return null;
  }

  return data;
};

export type CommentInsertDto = Database["public"]["Tables"]["Comment"]["Insert"];

// Memo 작성하기
export const createComment = async ({
  memoId,
  parentCommentId,
  content,
  password,
  nickname,
}: CommentInsertDto) => {
  const result = await supabase
    .from("Comment")
    .insert({
      memoId,
      parentCommentId,
      content,
      password: await hashPassword(password),
      nickname,
    })
    .select();

  if (result.status === 200) {
  }

  return result.data;
};

export const updateComment = async ({
  id,
  memoId,
  parentCommentId,
  content,
  password,
  nickname,
}: CommentInsertDto) => {
  if (!id) return;

  const result = await supabase
    .from("Comment")
    .update({
      memoId,
      parentCommentId,
      content,
      password: await hashPassword(password),
      nickname,
    })
    .eq("id", id)
    .select();

  return result.data;
};

export const softDeleteComment = async (commentId: string) => {
  const { data, error } = await supabase
    .from("Comment")
    .update({ deleteYn: true })
    .eq("id", commentId)
    .select()
    .single<CommentType>();
  if (error) throw error;
  return data;
};

export const restoreComment = async (commentId: string) => {
  const { data, error } = await supabase
    .from("Comment")
    .update({ deleteYn: false })
    .eq("id", commentId)
    .select()
    .single<CommentType>();
  if (error) throw error;
  return data;
};

// Comment 비밀번호 검증
export const checkCommentPassword = async (id: string, password: string) => {
  // 1. 저장된 해시된 비밀번호 조회
  const { data, error } = await supabase.from("Comment").select("password").eq("id", id).single(); // 단일 레코드 조회

  if (error || !data) {
    return false; // ID가 없거나 오류 발생 시
  }

  // 2. 해시된 비밀번호와 입력된 비밀번호 비교
  const isMatch = await compareHashPassword({ password, hashedPassword: data.password });

  return isMatch;
};

/** 서버에서 증가시킨 뒤 최신 likeCount(number)를 반환 */
export const incrementCommentLike = async (commentId: string) => {
  const { data, error } = await supabase.rpc("increment_comment_like", { p_comment: commentId });
  if (error) throw error;
  return data as number;
};
