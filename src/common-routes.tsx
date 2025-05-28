import type { FC } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import AuthRoute from "@routes/auth";
import { useAppCtxStore } from "@common/providers/app";

const CommonRoutes: FC = () => {
  const { user_name, is_authenticated } = useAppCtxStore((state) => state);

  return (
    <Routes>
      {is_authenticated && (
        <Route path={ROUTES.dashboard} element={<div>Dashboard</div>} />
      )}
      <Route
        path="*"
        element={<AuthRoute mode={user_name.length ? "sign-in" : "sign-up"} />}
      />
    </Routes>
  );
};

export default CommonRoutes;
