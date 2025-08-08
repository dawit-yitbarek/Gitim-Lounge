import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export function AuthRedirect({ children }) {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="flex bg-[#10214b] items-center justify-center min-h-screen">
            <Loader2 className="text-[#ebe7e1] animate-spin h-7 w-7" />
        </div>
    );

    if (user) return <Navigate to="/" replace />;
    return children;
}


export function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="flex bg-[#10214b] items-center justify-center min-h-screen">
            <Loader2 className="text-[#ebe7e1] animate-spin h-7 w-7" />
        </div>
    );

    if (!user) return <Navigate to="/auth" replace />;
    return children;
}
