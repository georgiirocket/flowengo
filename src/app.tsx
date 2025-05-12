import { Routes, Route } from "react-router";
import { useAppCtxStore } from "@common/providers/app";
import { ROUTES } from "@common/constants/routes.ts";
import "./app.css";

function App() {
  const { getIsAuthenticated } = useAppCtxStore((state) => state);
  const isAuth = getIsAuthenticated();

  return (
    <main className="w-full h-dvh">
      <Routes>
        <Route path={ROUTES.main} element={<h1>Hello</h1>} />
        {isAuth && (
          <Route path={ROUTES.dashboard} element={<div>Dashboard</div>} />
        )}
        <Route path="*" element={<h1>All</h1>} />
      </Routes>
    </main>
  );
}

export default App;
