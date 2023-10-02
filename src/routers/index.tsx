import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/home/Home"
import NotFound from "@/pages/NotFound";
import Test from "@/pages/test/test/Test";
import TestResult from "@/pages/test/TestResult/TestResult";
import BulletinBoard from "@/pages/board/BulletinBoard";
import Stats from "@/pages/stats/Stats";
import StatsMbti from "@/pages/stats/statsMbti/StatsMbti";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, path: "/", element: <Home /> },
        { path: "/test", element: <Test /> },
        { path: "/result", element: <TestResult /> },
        { path: "/board", element: <BulletinBoard /> },
        { path: "/board/:mbti", element: <BulletinBoard /> },
        { path: "/stats", element: <Stats /> },
        { path: "/stats/:mbti", element: <StatsMbti /> }
      ]
    }
  ]);

export default router;