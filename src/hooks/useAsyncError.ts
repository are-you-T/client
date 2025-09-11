import { useCallback, useState } from "react";

// 비동기 작업에서 발생하는 에러를 처리하기 위해 만들어진 훅
// 에러가 throw되면 전역 ErrorBoundary로 전달된다.
export const useAsyncError = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setError] = useState();

  return useCallback((error: Error) => {
    // React는 상태 업데이트 함수에 전달된 함수가 실행되는 시점에 발생하는 에러를 ErrorBoundary가 감지할 수 있게 합니다.
    // 이로 인해 ErrorBoundary는 렌더링 중에 발생한 것으로 에러를 인식하고 처리할 수 있게 됩니다.
    setError(() => {
      throw error;
    });
  }, []);
};
