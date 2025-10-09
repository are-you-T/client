import { create } from "zustand";
import type { MbtiDimensionType } from "@/types";

type QuestionSearchState = {
  subjects: string[];
  mbtiTypes: MbtiDimensionType[];
  addSubject: (v: string) => void;
  removeSubject: (v: string) => void;
  setSubjects: (v: string[]) => void;
  clearSubjects: () => void;
  addMbtiType: (v: MbtiDimensionType) => void;
  removeMbtiType: (v: MbtiDimensionType) => void;
  setMbtiTypes: (v: MbtiDimensionType[]) => void;
  clearMbtiTypes: () => void;
  clearAll: () => void;
};

export const useQuestionSearchStore = create<QuestionSearchState>((set, get) => ({
  subjects: [],
  mbtiTypes: [],
  addSubject: (v) => {
    const val = v.trim();
    if (!val) return;
    const cur = get().subjects;
    if (cur.includes(val)) return;
    set({ subjects: [...cur, val] });
  },
  removeSubject: (v) => set((s) => ({ subjects: s.subjects.filter((it) => it !== v) })),
  setSubjects: (v) => set({ subjects: v.filter((x) => !!x && x.trim().length > 0) }),
  clearSubjects: () => set({ subjects: [] }),
  addMbtiType: (v) => {
    const cur = get().mbtiTypes;
    if (cur.includes(v)) return;
    set({ mbtiTypes: [...cur, v] });
  },
  removeMbtiType: (v) => set((s) => ({ mbtiTypes: s.mbtiTypes.filter((it) => it !== v) })),
  setMbtiTypes: (v) => set({ mbtiTypes: Array.from(new Set(v)) }),
  clearMbtiTypes: () => set({ mbtiTypes: [] }),
  clearAll: () => set({ subjects: [], mbtiTypes: [] }),
}));
