import { supabase } from "@/supabaseClient";
import { Database } from "@/types/supabase";
import { hashPassword } from "@/utils/password";

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
    .select("*", { count: "exact" }) // head: false는 필요 없음
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

  return result.data;
};
