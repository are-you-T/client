import { supabase } from "@/supabaseClient";

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
