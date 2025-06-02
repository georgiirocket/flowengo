import type { FC } from "react";
import { useProjectsCtxStore } from "@common/providers/projects";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@common/constants/routes.ts";
import { getLocalProjectId } from "@common/helpers/save-local-project-id.ts";

const Dashboard: FC = () => {
  const projectsData = useProjectsCtxStore((state) => state.projectsData);
  const projectId = getLocalProjectId(projectsData);

  if (projectId) {
    return <Navigate to={`${ROUTES.dashboard}/${projectId}`} />;
  }

  return (
    <div>
      <h1>Hello Dashboard</h1>
    </div>
  );
};

export default Dashboard;
