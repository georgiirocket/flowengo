import type { FC } from "react";
import ReactLogo from "@assets/icon-sq.svg?react";

const DashboardLoading: FC = () => {
  return (
    <div className="w-dvw h-dvh grid place-content-center">
      <div className="flex gap-1 items-center">
        <ReactLogo className="size-[20px]" />
        <p className="text-tiny">Loading...</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
