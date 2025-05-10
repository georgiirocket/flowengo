import { Routes, Route } from "react-router";
import "./app.css";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const click = () => {
    invoke("get_app_settings")
      .then((settings) => {
        console.log(settings);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const createUser = () => {
    invoke("create_user", { name: "John" })
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <main className="w-full h-dvh">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={click}>Click</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={createUser}>Create user</button>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </main>
  );
}

export default App;
