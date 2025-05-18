import type { FC, PropsWithChildren } from "react";
import { ThemeProvider as Provider } from "next-themes";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider attribute="class">{children}</Provider>;
};

export default ThemeProvider;
