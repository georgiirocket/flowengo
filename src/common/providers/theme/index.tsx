import type { FC, PropsWithChildren } from "react";
import { ThemeProvider as Provider } from "next-themes";
import { THEME } from "@common/constants/theme";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider attribute="class" themes={Object.values(THEME)}>
      {children}
    </Provider>
  );
};

export default ThemeProvider;
