import { Routes, Route } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import useSWR from "swr";
import { promiseWithDelay } from "@common/helpers/promise-with-delay.ts";
import { getAppState } from "@common/actions/get-app-state";
import { AppProvider } from "@common/providers/app";
import AuthRoute from "@routes/auth";
import "./app.css";

function App() {
  const { data } = useSWR("init", () => promiseWithDelay(getAppState, 2000), {
    suspense: true,
  });

  return (
    <AppProvider data={data}>
      <main className="w-full h-dvh">
        <Routes>
          <Route
            path={ROUTES.main}
            element={
              <AuthRoute
                mode={data?.user_name.length ? "sign-in" : "sign-up"}
              />
            }
          />
          <Route path={ROUTES.dashboard} element={<div>Dashboard</div>} />
        </Routes>
      </main>
    </AppProvider>
  );
}

export default App;
