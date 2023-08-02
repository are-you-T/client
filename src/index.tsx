import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Test from "@/pages/test/Test";
import TestResult from "@/pages/test/TestResult";
import BulletinBoard from "@/pages/board/BulletinBoard";
import BulletinDetail from "@/pages/board/BulletinDetail";
import Stats from "@/pages/stats/Stats";
import StatsMbti from "@/pages/stats/StatsMbti";
import BoardPost from "@/components/board/BoardPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
      { path: "/test/result", element: <TestResult /> },
      { path: "/board", element: <BulletinBoard /> },
      { path: "/board/:mbti", element: <BulletinDetail /> },
      { path: "/stats", element: <Stats /> },
      { path: "/stats/:mbti", element: <StatsMbti /> },
    ],
  },
  {
    // 게시글 작성 확인용 -> 추후에 BulletinBoard page 안에서 컴포넌트로만 사용할 예정
    path: "/post",
    element: <BoardPost onThisClose={() => console.log("닫기")} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
