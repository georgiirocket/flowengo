import { HeroUIProvider as UiProvider } from "@heroui/react";
import type { FC, PropsWithChildren } from "react";

const HeroUiProvider: FC<PropsWithChildren> = ({ children }) => {
  return <UiProvider>{children}</UiProvider>;
};

export default HeroUiProvider;
