import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import TestResult from "./pages/TestResult";
import BulletinDetail from "./pages/BulletinDetail";
import Stats from "./pages/Stats";
import BulletinBoard from "./pages/BulletinBoard";
import BoardPost from "./components/BoardPost";
import StatsMbti from './pages/StatsMbti';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
      { path: "/test/result", element: <TestResult /> },
      { path: "/bulletin", element: <BulletinBoard /> },
      { path: "/bulletin/:mbti", element: <BulletinDetail /> },
      { path: "/stats", element: <Stats /> },
      { path: '/stats/:mbti', element: <StatsMbti />}
    ],
  },
  {
    // 게시글 작성 확인용 -> 추후에 BulletinBoard page 안에서 컴포넌트로만 사용할 예정
    path: "/post",
    element: <BoardPost />,
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
