import { useErrorStore } from "@/stores/useErrorStore";

// 에러 상태를 관리하는 커스텀 Hook
export const useHandleError = () => {
  const { error, setError } = useErrorStore(); // 전역 상태에서 에러와 setError 함수를 가져옴

  // 렌더링 중 에러가 존재할 경우 에러를 던짐 (ErrorBoundary에서 감지됨)
  if (error) {
    throw error;
  }

  // 에러 상태를 설정할 수 있는 함수를 반환
  return setError;
};
