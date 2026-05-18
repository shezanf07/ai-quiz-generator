import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "../../services/api";

export function ProtectedRoute() {
    const isAuthenticated = !!getAuthToken();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export function PublicRoute() {
    const isAuthenticated = !!getAuthToken();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
