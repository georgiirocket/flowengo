import { useEffect } from "react";

export const useDisableBack = () => {
  useEffect(() => {
    const disableFn = (): void => {
      window.history.pushState(null, "", window.location.href);
    };

    // Prevent back navigation (in SPA or Tauri app)
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", disableFn);

    return () => {
      window.removeEventListener("popstate", disableFn);
    };
  }, []);
};
