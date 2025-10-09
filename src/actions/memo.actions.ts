import { supabase } from "@/supabaseClient";
import { MemoType, MbtiType } from "@/types";
import { Database } from "@/types/supabase";
import { compareHashPassword, hashPassword } from "@/utils/password";

export const memoQueryKey = "memo";
export const memoListQueryKey = "memoList";

// Memo List 가져오기
export const getMemoList = async ({
  pageParam = 0,
  mbtiTypes,
  titles,
  contents,
}: {
  pageParam?: number;
  mbtiTypes?: MbtiType[];
  titles?: string[];
  contents?: string[];
}) => {
  const limit = 5;
  const offset = pageParam * limit;

  // ✅ 데이터 + 전체 count 조회
  let query = supabase
    .from("Memo")
    .select("*", { count: "exact" }) // head: false는 필요 없음
    .eq("deleteYn", false);

  if (mbtiTypes && mbtiTypes.length > 0) {
    query = query.in("mbtiType", mbtiTypes as ReadonlyArray<MbtiType>);
  }
  if (titles && titles.length > 0) {
    const parts = titles
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => `title.ilike.%${s.replace(/[%]/g, "")}%`);
    if (parts.length > 0) {
      query = query.or(parts.join(","));
    }
  }
  if (contents && contents.length > 0) {
    const parts = contents
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => `content.ilike.%${s.replace(/[%]/g, "")}%`);
    if (parts.length > 0) {
      query = query.or(parts.join(","));
    }
  }

  const { data, error, count } = await query
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

export const getMemoById = async (id: string) => {
  const { data, error } = await supabase
    .from("Memo")
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

export type MemoInsertDto = Database["public"]["Tables"]["Memo"]["Insert"];

// Memo 작성하기
export const createMemo = async ({
  title,
  content,
  password,
  nickname,
  mbtiType,
  cardColor,
}: MemoInsertDto) => {
  const result = await supabase
    .from("Memo")
    .insert({
      title,
      content,
      password: await hashPassword(password),
      nickname,
      mbtiType,
      cardColor,
    })
    .select();

  return result.data;
};

// Memo 수정하기
export const updateMemo = async ({
  id,
  title,
  content,
  password,
  nickname,
  mbtiType,
  cardColor,
}: MemoInsertDto) => {
  if (!id) return;

  const result = await supabase
    .from("Memo")
    .update({
      title,
      content,
      password: await hashPassword(password),
      nickname,
      mbtiType,
      cardColor,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  return result.data;
};

export const softDeleteMemo = async (memoId: string) => {
  const { data, error } = await supabase
    .from("Memo")
    .update({ deleteYn: true })
    .eq("id", memoId)
    .select()
    .single<MemoType>();
  if (error) throw error;
  return data;
};

export const incrementMemoLike = async (memoId: string) => {
  const { data, error } = await supabase.rpc("increment_memo_like", { p_memo: memoId });
  if (error) throw error;
  return data as number; // 새로운 likeCount
};

// Memo 비밀번호 검증
export const checkMemoPassword = async (id: string, password: string) => {
  // 1. 저장된 해시된 비밀번호 조회
  const { data, error } = await supabase.from("Memo").select("password").eq("id", id).single(); // 단일 레코드 조회

  if (error || !data) {
    return false; // ID가 없거나 오류 발생 시
  }

  // 2. 해시된 비밀번호와 입력된 비밀번호 비교
  const isMatch = await compareHashPassword({ password, hashedPassword: data.password });

  return isMatch;
};
