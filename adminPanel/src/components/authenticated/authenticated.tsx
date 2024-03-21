import { useIsAuthenticated, useGo, usePermissions } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/mui";
import { UserRole } from "./authenticatedEnum";

type AuthenticatedProps = {
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  role?: UserRole[];
  children: any;
};

export const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  fallback,
  loading,
  role,
}) => {
  const { isLoading, data } = useIsAuthenticated();
  const { data: permission }: any = usePermissions();
  const go = useGo();

  if (isLoading) {
    console.log("loading..");
    return <>{loading}</> || null;
  }

  if (data?.error) {
    console.log(data?.error, "error");

    if (!fallback) {
      go({ to: "/login", type: "replace" });
      return null;
    }

    return <>{fallback}</>;
  }

  if (
    data?.authenticated &&
    (!role || role.includes(permission?.role as UserRole))
  ) {
    return <>{children}</>;
  }

  return (
    <>
      <ErrorComponent />
    </>
  );
};
