import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const HomePage = lazy(() => import("@/pages/Home"));
const TestPage = lazy(() => import("@/pages/Test"));
const TestResultPage = lazy(() => import("@/pages/TestResult"));
const MemoPage = lazy(() => import("@/pages/Memo"));
const MemoViewPage = lazy(() => import("@/pages/Memo/View"));
const QuestionPage = lazy(() => import("@/pages/Question"));
const QuestionViewPage = lazy(() => import("@/pages/Question/View"));
const StatsPage = lazy(() => import("@/pages/Stats"));
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
