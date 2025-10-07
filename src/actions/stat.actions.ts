import { supabase } from "@/supabaseClient";
import { MbtiType } from "@/types";

export const statQueryKey = "stat";
export const statDataQueryKey = "statData";

// stats List 가져오기
export const getMbtiStats = async () => {
  const { data, error } = await supabase
    .from("Mbti")
    .select(
      `
      id, mbtiType, count
    `,
      { count: "exact" }
    )
    .eq("deleteYn", false)
    .order("count", { ascending: false }); // 부모(Question) 정렬

  if (error) throw error;

  return data;
};

export const getMbtiTypeStat = async (mbtiType: MbtiType) => {
  const { data, error } = await supabase
    .from("Mbti")
    .select(
      `
      id, summary, content, tags, created_at, updated_at, mbtiType, count, deleteYn,
      MbtiFit (
        id, description, mbtiType, fitType, targetMbtiType, created_at, updated_at, deleteYn
      )
    `,
      { count: "exact" }
    )
    .eq("deleteYn", false)
    .eq("mbtiType", mbtiType)
    .maybeSingle();

  if (error) {
    console.error("Error fetching Question with answers:", error);
    return null;
  }

  return data;
};

export const getMbtiTestResult = async () => {
  const { data, error } = await supabase
    .from("Mbti")
    .select(
      `
      id, summary, content, tags, created_at, updated_at, mbtiType, count, deleteYn,
      MbtiFit (
        id, description, mbtiType, fitType, targetMbtiType, created_at, updated_at, deleteYn
      )
    `,
      { count: "exact" }
    )
    .eq("deleteYn", false)
    .order("count", { ascending: false }); // 부모(Question) 정렬

  if (error) throw error;

  return data;
};

// Increment MBTI type's count by 1
export const incrementMbtiCount = async (mbtiType: MbtiType) => {
  // Fetch current row
  const { data, error } = await supabase
    .from("Mbti")
    .select("id, count")
    .eq("deleteYn", false)
    .eq("mbtiType", mbtiType)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("MBTI type not found");

  const nextCount = (data.count ?? 0) + 1;

  const { error: updateError } = await supabase
    .from("Mbti")
    .update({ count: nextCount })
    .eq("id", data.id);

  if (updateError) throw updateError;

  return { id: data.id, mbtiType, count: nextCount };
};
