import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/dashboard"));

export const routes: RouteObject[] = [
  {
    path: "*",
    element: <div>not found</div>,
  },

  {
    path: "/",
    element: <Dashboard />,
  },
];
