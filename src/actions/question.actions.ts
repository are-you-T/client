import { supabase } from "@/supabaseClient";
import { QuestionWithAnswersType } from "@/types";

export const questionQueryKey = "question";
export const questionListQueryKey = "questionList";
export const questionMBTITestQueryKey = "questionMBTITest";

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

export const getMBTITestQuestions = async () => {
  // 셔플 유틸 (Fisher–Yates)
  const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const questionColumns = `
      id, subject, mbtiType, created_at, updated_at, deleteYn
    `;
  const answerColumns = `
      id, questionId, dimension,
      energy, awareness, judgement, life,
      content, proportion, created_at, updated_at
    `;

  // RPC로 타입별 무작위 4개 조회 (존재하지 않으면 fallback)
  const fetchRandomByType = async (type: "energy" | "awareness" | "judgement" | "life") => {
    // RPC는 테이블 행만 반환하므로, RPC에는 select를 붙이지 않고
    // 후속으로 Answer를 별도 조회하여 합칩니다.
    const rpc = await supabase.rpc("get_random_questions_by_type", {
      p_type: type,
      p_limit: 4,
    });

    if (rpc.error) {
      console.error(`RPC error for ${type}:`, rpc.error);
      // Fallback: 무작위가 아닌 단순 4개 제한 (가능한 데이터만)
      const fb = await supabase
        .from("Question")
        .select(questionColumns)
        .eq("deleteYn", false)
        .eq("mbtiType", type)
        .limit(4);
      if (fb.error) {
        console.error(`Fallback error for ${type}:`, fb.error);
      }
      return fb.data ?? [];
    }
    return rpc.data ?? [];
  };

  const [energy, awareness, judgement, life] = await Promise.all([
    fetchRandomByType("energy"),
    fetchRandomByType("awareness"),
    fetchRandomByType("judgement"),
    fetchRandomByType("life"),
  ]);

  const selected = [...energy, ...awareness, ...judgement, ...life];

  // 선택된 질문들의 Answer를 한 번에 조회하여 합치기
  const ids = selected.map((q: any) => q.id);
  if (ids.length === 0) return [];

  const { data: answers, error: ansErr } = await supabase
    .from("Answer")
    .select(answerColumns)
    .in("questionId", ids);
  if (ansErr) {
    console.error("Error fetching Answers for selected questions:", ansErr);
  }

  const byQuestion = new Map<string, any[]>();
  (answers ?? []).forEach((a: any) => {
    const arr = byQuestion.get(a.questionId) ?? [];
    arr.push(a);
    byQuestion.set(a.questionId, arr);
  });

  const withAnswers = selected.map((q: any) => ({
    ...q,
    Answer: byQuestion.get(q.id) ?? [],
  }));

  // 최종 순서만 랜덤으로 섞어서 반환
  return shuffle(withAnswers) as QuestionWithAnswersType[];
};
