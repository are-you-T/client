import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "@/styles/fonts.css"; // 폰트 CSS 추가

const root = document.getElementById("root") as HTMLElement;

const rootElement = createRoot(root);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
      retry: 2, // 실패 시 최대 2회 재시도
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      refetchOnWindowFocus: true, // 탭 전환 시 재조회
      refetchOnReconnect: true, // 네트워크 복구 시 재조회
      networkMode: "always", // 오프라인에서도 큐잉 후 실행
    },
    mutations: {
      networkMode: "always", // 뮤테이션도 네트워크 상태 무시하고 큐잉
    },
  },
});

rootElement.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
