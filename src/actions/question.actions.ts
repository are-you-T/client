import { supabase } from "@/supabaseClient";

export const questionQueryKey = "question";
export const questionListQueryKey = "questionList";

// question List 가져오기
export const getQuestionListWithAnswers = async ({ pageParam = 0 }) => {
  const limit = 5;
  const offset = pageParam * limit;

  const { data, error, count } = await supabase
    .from("Question")
    .select(
      `
      id, subject, mbtiType, created_at, updated_at, deleteYn,
      Answer (
        id, questionId, dimension,
        energy, awareness, judgement, life,
        content, proportion, created_at, updated_at
      )
    `,
      { count: "exact" }
    )
    .eq("deleteYn", false) // ⚠️ 실제 컬럼명이 deleteyn 이면 소문자로 바꿔주세요
    .order("created_at", { ascending: false }) // 부모(Question) 정렬
    .order("created_at", {
      // 자식(Answer) 정렬
      foreignTable: "Answer",
      ascending: false,
    })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const totalRecords = count ?? 0;
  const fetched = data?.length ?? 0;
  const isLastPage = offset + fetched >= totalRecords;

  return {
    data: data ?? [],
    nextPage: !isLastPage ? pageParam + 1 : undefined,
    isLastPage,
  };
};

export const getQuestionByIdWithAnswers = async (id: string) => {
  const { data, error } = await supabase
    .from("Question")
    .select(
      `
      id, subject, mbtiType, created_at, updated_at, deleteYn,
      Answer (
        id, questionId, dimension,
        energy, awareness, judgement, life,
        content, proportion, created_at, updated_at
      )
    `
    )
    .eq("id", id)
    .is("deleteYn", false) // ⚠️ 실제 컬럼명이 deleteyn 이면 .is("deleteyn", false)
    .order("created_at", { foreignTable: "Answer", ascending: false })
    .maybeSingle();

  if (error) {
    console.error("Error fetching Question with answers:", error);
    return null;
  }
  return data; // { ... , Answer: AnswerRow[] }
};
