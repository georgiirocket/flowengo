import { useEffect, useRef } from "react";

export const useMainResize = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const resize = () => {
      if (mainRef.current) {
        mainRef.current.style.width = `${window.innerWidth}px`;
        mainRef.current.style.height = `${window.innerHeight}px`;
      }

      window.document.body.style.width = `${window.innerWidth}px`;
      window.document.body.style.height = `${window.innerHeight}px`;

      document.documentElement.style.width = `${window.innerWidth}px`;
      document.documentElement.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return { mainRef };
};
