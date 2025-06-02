import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import HeroUiProvider from "@common/providers/hero-ui";
import ThemeProvider from "@common/providers/theme";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import CommonLoading from "@common/components/loading/common";
import "@common/tauri/native-menu";

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
            <Suspense fallback={<CommonLoading />}>
              <App />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </HeroUiProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
