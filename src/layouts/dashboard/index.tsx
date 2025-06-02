import { type FC, useEffect } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";
import { Outlet } from "react-router-dom";
import { DashboardModalProvider } from "@common/providers/dashboard-modal";
import Footer from "./components/footer";
import { enableProjectMenu } from "@common/tauri/native-menu";

const DashboardLayout: FC = () => {
  const { data: result } = useSWR("protected", getProtectedData, {
    suspense: true,
  });

  if (result.error || !result.data) {
    throw new Error(result.error);
  }

  useEffect(() => {
    enableProjectMenu(true);

    return () => {
      enableProjectMenu(false);
    };
  }, []);

  return (
    <DashboardModalProvider>
      <ProjectsProvider data={result.data}>
        <div className="size-full p-2 grid grid-rows-[1fr_auto] gap-2 overflow-hidden">
          <Outlet />
          <Footer />
        </div>
      </ProjectsProvider>
    </DashboardModalProvider>
  );
};

export default DashboardLayout;
