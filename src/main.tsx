import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import HeroUiProvider from "@common/providers/hero-ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HeroUiProvider>
      <App />
    </HeroUiProvider>
  </React.StrictMode>,
);
