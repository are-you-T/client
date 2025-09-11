import { create } from 'zustand';

// 전역 에러 상태를 관리하는 인터페이스 정의
interface ErrorState {
  error: Error | null; // 현재 에러 상태
  setError: (error: Error | null) => void; // 에러를 설정하는 함수
}

// 전역 에러 상태를 관리하는 zustand 스토어
export const useErrorStore = create<ErrorState>((set) => ({
  error: null, // 초기 에러 상태는 null
  setError: (error) => set({ error }) // setError 호출 시 상태 업데이트
}));
