import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const HomePage = lazy(() => import("@/pages/home"));
const TestPage = lazy(() => import("@/pages/test"));
const TestResultPage = lazy(() => import("@/pages/testResult"));
const MemoPage = lazy(() => import("@/pages/memo"));
const MemoViewPage = lazy(() => import("@/pages/memo/view"));
const QuestionPage = lazy(() => import("@/pages/question"));
const QuestionViewPage = lazy(() => import("@/pages/question/view"));
const StatsPage = lazy(() => import("@/pages/stats"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const routePaths = [
  { path: "/", element: <HomePage /> },
  { path: "/memo", element: <MemoPage /> },
  { path: "/memo/:id", element: <MemoViewPage /> },
  { path: "/question", element: <QuestionPage /> },
  { path: "/question/:id", element: <QuestionViewPage /> },
  { path: "/stats", element: <StatsPage /> },
  { path: "/test", element: <TestPage /> },
  { path: "/result/:mbti", element: <TestResultPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routePaths;
