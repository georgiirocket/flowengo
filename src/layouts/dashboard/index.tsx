import { type FC, lazy, useEffect } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { enableProjectMenu } from "@common/tauri/native-menu";

const UserModal = lazy(() => import("./components/modals/user"));
const NewProjectModal = lazy(() => import("./components/modals/new-project"));

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
    <ProjectsProvider data={result.data}>
      <div className="size-full p-2 grid grid-rows-[1fr_auto] gap-2 overflow-hidden">
        <Outlet />
        <Footer />
        <UserModal />
        <NewProjectModal />
      </div>
    </ProjectsProvider>
  );
};

export default DashboardLayout;
