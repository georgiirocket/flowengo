import type { FC } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";
import { Outlet } from "react-router-dom";
import { DashboardModalProvider } from "@common/providers/dashboard-modal";

const DashboardLayout: FC = () => {
  const { data: result } = useSWR("protected", getProtectedData, {
    suspense: true,
  });

  if (result.error || !result.data) {
    throw new Error(result.error);
  }

  return (
    <DashboardModalProvider>
      <ProjectsProvider data={result.data}>
        <div className="size-full p-2 grid grid-rows-[1fr_auto]">
          <div>
            <Outlet />
          </div>
          <div>Footer</div>
        </div>
      </ProjectsProvider>
    </DashboardModalProvider>
  );
};

export default DashboardLayout;
