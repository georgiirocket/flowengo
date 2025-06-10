import { lazy, Suspense } from "react";
import useSWR from "swr";
import { promiseWithDelay } from "@common/helpers/promise-with-delay.ts";
import { getAppState } from "@common/actions/get-app-state";
import { AppProvider } from "@common/providers/app";
import { Route, Routes } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import DashboardLoading from "@common/components/loading/dashboard";
import AuthRoute from "@routes/auth";
import DashboardLayout from "@layouts/dashboard";
import Dashboard from "@routes/dashboard";
import Project from "@routes/project";
import "./app.css";
import { useMainResize } from "@common/hooks/use-main-resize.ts";
import { useDisableBack } from "@common/hooks/use-disable-back.ts";

const DropDataModal = lazy(() => import("@common/modals/drop-data"));

function App() {
  const { data } = useSWR("init", () => promiseWithDelay(getAppState, 2000), {
    suspense: true,
  });

  const { mainRef } = useMainResize();
  useDisableBack();

  return (
    <AppProvider data={data}>
      <main ref={mainRef} className="w-full h-[100vh]">
        <Routes>
          <Route
            path={ROUTES.dashboard}
            element={
              <Suspense fallback={<DashboardLoading />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path=":id" element={<Project />} />
          </Route>
          <Route
            path={ROUTES.main}
            element={
              <AuthRoute mode={data.user_name.length ? "sign-in" : "sign-up"} />
            }
          />
        </Routes>
        <DropDataModal />
      </main>
    </AppProvider>
  );
}

export default App;
