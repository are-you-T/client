import { supabase } from "@/supabaseClient";
import { Database } from "@/types/supabase";
import { hashPassword } from "@/utils/password";

export const memoQueryKey = "memo";
// Memo List 가져오기
export const getMemoList = async ({ pageParam = 0 }) => {
  const limit = 5;
  const offset = pageParam * limit;

  // ✅ 데이터 + 전체 count 조회
  const { data, error, count } = await supabase
    .from("Memo")
    .select("*", { count: "exact" }) // head: false는 필요 없음
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
