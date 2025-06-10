import { HeroUIProvider as UiProvider } from "@heroui/react";
import type { FC, PropsWithChildren } from "react";
import { ToastProvider } from "@heroui/toast";

const HeroUiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UiProvider>
      <ToastProvider placement="top-right" />
      {children}
    </UiProvider>
  );
};

export default HeroUiProvider;
