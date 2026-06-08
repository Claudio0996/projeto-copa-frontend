import { createBrowserRouter } from "react-router";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./PublicRoute";
import AdminPanel from "../features/admin/AdminPanel";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashBoardPage";

const router = createBrowserRouter([
  { path: "/admin", element: <PrivateRoute />, children: [{ index: true, element: <AdminPanel /> }] },
  { path: "/", element: <PublicRoute />, children: [{ index: true, element: <LoginPage /> }] },
  { path: "/dashboard", element: <DashboardPage /> },
]);

export default router;
