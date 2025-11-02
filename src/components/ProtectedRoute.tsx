import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FullPageLoading } from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!loading && requireAdmin && user && !isAdmin) {
      toast({
        title: "Admin Access Required",
        description: "You need admin privileges to access this page. Please add admin role in Supabase.",
        variant: "destructive",
        duration: 8000,
      });
    }
  }, [loading, requireAdmin, user, isAdmin, toast]);

  if (loading) {
    return <FullPageLoading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Store the attempted URL so user knows where they tried to go
    if (location.pathname === "/admin") {
      toast({
        title: "Admin Access Required",
        description: "You need admin privileges. Run SETUP_ADMIN.sql in Supabase SQL Editor with your email.",
        variant: "destructive",
        duration: 10000,
      });
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
