import { type FC, lazy, useEffect } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { menu } from "@common/tauri/native-menu";

const UserModal = lazy(() => import("./components/modals/user"));
const NewProjectModal = lazy(() => import("./components/modals/new-project"));
const EditProjectModal = lazy(() => import("./components/modals/edit-project"));
const NewStepItemModal = lazy(
  () => import("./components/modals/new-step-item"),
);

const DashboardLayout: FC = () => {
  const { data: result } = useSWR("protected", getProtectedData, {
    suspense: true,
  });

  if (result.error || !result.data) {
    throw new Error(result.error);
  }

  useEffect(() => {
    menu.enableProjectMenu(true);

    return () => {
      menu.enableProjectMenu(false);
    };
  }, []);

  return (
    <ProjectsProvider data={result.data}>
      <div className="size-full p-2 grid grid-rows-[1fr_auto] gap-2 overflow-hidden">
        <Outlet />
        <Footer />
        <UserModal />
        <NewProjectModal />
        <EditProjectModal />
        <NewStepItemModal />
      </div>
    </ProjectsProvider>
  );
};

export default DashboardLayout;
