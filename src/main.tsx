import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import HeroUiProvider from "@common/providers/hero-ui";
import ThemeProvider from "@common/providers/theme";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import CommonLoading from "@common/components/loading/common";
import { menu } from "@common/tauri/native-menu";
import { FallbackRender } from "@common/components/fallback-render";

void menu.init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <HeroUiProvider>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={FallbackRender}>
            <Suspense fallback={<CommonLoading />}>
              <App />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </HeroUiProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
