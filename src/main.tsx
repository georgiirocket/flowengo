import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import HeroUiProvider from "@common/providers/hero-ui";
import ThemeProvider from "@common/providers/theme";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <HeroUiProvider>
        <BrowserRouter>
          <ErrorBoundary
            fallback={<div>Something went wrong.</div>}
            onReset={() => {
              location.pathname = "/";
            }}
          >
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </HeroUiProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
