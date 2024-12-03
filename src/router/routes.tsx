import { ProtectedRoute } from "@/components/protected-routes";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/modules/admin/dashboard"));
const Login = lazy(() => import("@/pages/login"));
const Elections = lazy(() => import("@/pages/modules/admin/elections"));
const CreateElections = lazy(
  () => import("@/pages/modules/admin/create-elections")
);
const ElectionsDetails = lazy(
  () => import("@/pages/modules/admin/election-details")
);
const Employees = lazy(() => import("@/pages/modules/admin/employees"));
const CreateEmployees = lazy(
  () => import("@/pages/modules/admin/create-employee")
);

export const routes: RouteObject[] = [
  {
    path: "*",
    element: <div>not found</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // admin
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/elections",
    element: (
      <ProtectedRoute>
        <Elections />
      </ProtectedRoute>
    ),
  },
  {
    path: "/elections/create",
    element: (
      <ProtectedRoute>
        <CreateElections />
      </ProtectedRoute>
    ),
  },
  {
    path: "/elections/:id",
    element: (
      <ProtectedRoute>
        <ElectionsDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoute>
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees/create",
    element: (
      <ProtectedRoute>
        <CreateEmployees />
      </ProtectedRoute>
    ),
  },
];
