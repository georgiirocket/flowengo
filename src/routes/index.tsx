import { type FC, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import AuthRoute from "@routes/auth";
import Dashboard from "@routes/dashboard";
import { useAppCtxStore } from "@common/providers/app";
import DashboardLoading from "@common/components/loading/dashboard";

const CommonRoutes: FC = () => {
  const { user_name, is_authenticated } = useAppCtxStore((state) => state);

  return (
    <Routes>
      {is_authenticated && (
        <Route
          index
          path={ROUTES.dashboard}
          element={
            <Suspense fallback={<DashboardLoading />}>
              <Dashboard />
            </Suspense>
          }
        />
      )}
      <Route
        path="*"
        element={<AuthRoute mode={user_name.length ? "sign-in" : "sign-up"} />}
      />
    </Routes>
  );
};

export default CommonRoutes;
