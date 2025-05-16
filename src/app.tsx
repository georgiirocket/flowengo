import { Routes, Route } from "react-router";
import { ROUTES } from "@common/constants/routes.ts";
import "./app.css";

function App() {
  return (
    <main className="w-full h-dvh">
      <Routes>
        <Route path={ROUTES.main} element={<h1>Hello</h1>} />
        <Route path={ROUTES.dashboard} element={<div>Dashboard</div>} />
        <Route path="*" element={<h1>All</h1>} />
      </Routes>
    </main>
  );
}

export default App;
