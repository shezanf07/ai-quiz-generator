// Route guards. They send users to the right place based on login state.
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "../../services/api";

export function ProtectedRoute() {
    const isAuthenticated = !!getAuthToken();
    const location = useLocation();

    // Save the attempted page so login can return the user there.
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export function PublicRoute() {
    const isAuthenticated = !!getAuthToken();

    // Logged-in creators do not need login/register pages.
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
