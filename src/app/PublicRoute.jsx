import useAuth from "../features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
  const { state } = useAuth();

  if (state.isLoading) {
    return null;
  }

  if (state.user && state.token) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}
