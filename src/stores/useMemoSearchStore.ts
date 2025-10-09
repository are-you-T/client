import { create } from "zustand";
import type { MbtiType } from "@/types";

type MemoSearchState = {
  selectedMbti: MbtiType[];
  addMbti: (type: string) => void;
  removeMbti: (type: string) => void;
  clearMbti: () => void;
};

export const useMemoSearchStore = create<MemoSearchState>((set, get) => ({
  selectedMbti: [],
  addMbti: (type: string) => {
    const t = (type || "").toUpperCase();
    if (!t) return;
    const current = get().selectedMbti;
    if (current.includes(t as MbtiType)) return; // dedupe
    set({ selectedMbti: [...current, t as MbtiType] });
  },
  removeMbti: (type: string) => {
    const t = (type || "").toUpperCase();
    set((state) => ({ selectedMbti: state.selectedMbti.filter((it) => it !== (t as MbtiType)) }));
  },
  clearMbti: () => set({ selectedMbti: [] }),
}));
