import { Routes, Route } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import useSWR from "swr";
import { promiseWithDelay } from "@common/helpers/promise-with-delay.ts";
import "./app.css";

const test = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("test");
    }, 500);
  });
};

function App() {
  const { data } = useSWR("/api/user", () => promiseWithDelay(test, 2000), {
    suspense: true,
  });

  return (
    <main className="w-full h-dvh">
      <Routes>
        <Route path={ROUTES.main} element={<h1>Hello</h1>} />
        <Route path={ROUTES.dashboard} element={<div>Dashboard</div>} />
        <Route path="*" element={<h1>All</h1>} />
      </Routes>
      <p>{data}</p>
    </main>
  );
}

export default App;
