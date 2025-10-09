import { create } from "zustand";
import type { MbtiType } from "@/types";

type MemoSearchState = {
  selectedMbti: MbtiType[];
  addMbti: (type: string) => void;
  removeMbti: (type: string) => void;
  clearMbti: () => void;
  memoQuery: {
    titles: string[];
    contents: string[];
  };
  addTitles: (titles: string[]) => void;
  addContents: (contents: string[]) => void;
  removeTitle: (title: string) => void;
  removeContent: (content: string) => void;
  clearMemoQuery: () => void;
};

export const useMemoSearchStore = create<MemoSearchState>((set, get) => ({
  selectedMbti: [],
  memoQuery: { titles: [], contents: [] },
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
  addTitles: (titles) =>
    set((state) => ({
      memoQuery: {
        ...state.memoQuery,
        titles: Array.from(
          new Set([
            ...state.memoQuery.titles,
            ...titles.map((t) => t.trim()).filter((t) => t.length > 0),
          ])
        ),
      },
    })),
  addContents: (contents) =>
    set((state) => ({
      memoQuery: {
        ...state.memoQuery,
        contents: Array.from(
          new Set([
            ...state.memoQuery.contents,
            ...contents.map((c) => c.trim()).filter((c) => c.length > 0),
          ])
        ),
      },
    })),
  removeTitle: (title) =>
    set((state) => ({
      memoQuery: {
        ...state.memoQuery,
        titles: state.memoQuery.titles.filter((t) => t !== title),
      },
    })),
  removeContent: (content) =>
    set((state) => ({
      memoQuery: {
        ...state.memoQuery,
        contents: state.memoQuery.contents.filter((c) => c !== content),
      },
    })),
  clearMemoQuery: () => set({ memoQuery: { titles: [], contents: [] } }),
}));
