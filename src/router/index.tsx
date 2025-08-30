import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const MainPage = lazy(() => import("@/pages/Home/Home"));
// const TestPage = lazy(() => import("@/pages/Test/Test"));
// const TestResultPage = lazy(() => import("@/pages/TestResult/TestResult"));
// const MemoPage = lazy(() => import("@/pages/Memo/BulletinBoard"));
// const MemoViewPage = lazy(() => import("@/pages/Memo/View/CardDetail"));
// const QuestionPage = lazy(() => import("@/pages/Question"));
// const QuestionViewPage = lazy(() => import("@/pages/Question/View"));
// const StatsPage = lazy(() => import("@/pages/Stats/Stats"));
// const StatsMbtiPage = lazy(() => import("@/pages/StatsMbti/StatsMbti"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const routePaths = [
  { path: "/", element: <MainPage /> },
  // { path: "/memo", element: <MemoPage /> },
  // { path: "/memo/:mbti", elment: <MemoPage /> },
  // { path: "/memoview/:id", element: <MemoViewPage /> },
  // { path: "/question", element: <QuestionPage /> },
  // { path: "/question/:id", element: <QuestionViewPage /> },
  // { path: "/stats", element: <StatsPage /> },
  // { path: "/stats/:mbti", element: <StatsMbtiPage /> },
  // { path: "/test", element: <TestPage /> },
  // { path: "/result/:mbti", element: <TestResultPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routePaths;
