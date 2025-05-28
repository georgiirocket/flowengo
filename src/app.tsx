import { lazy } from "react";
import useSWR from "swr";
import { promiseWithDelay } from "@common/helpers/promise-with-delay.ts";
import { getAppState } from "@common/actions/get-app-state";
import { AppProvider } from "@common/providers/app";
import CommonRoutes from "@src/routes";
import "./app.css";

const DropDataModal = lazy(() => import("@common/modals/drop-data"));

function App() {
  const { data } = useSWR("init", () => promiseWithDelay(getAppState, 2000), {
    suspense: true,
  });

  return (
    <AppProvider data={data}>
      <main className="w-full h-dvh">
        <CommonRoutes />
        <DropDataModal />
      </main>
    </AppProvider>
  );
}

export default App;
