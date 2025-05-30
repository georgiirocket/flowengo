import type { FC } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";

const Dashboard: FC = () => {
  const { data: result } = useSWR("protected", () => getProtectedData(), {
    suspense: true,
  });

  if (result?.error || !result?.data) {
    throw new Error(result.error);
  }

  return (
    <ProjectsProvider data={result.data}>
      <div>
        <h1>Hello Dashboard</h1>
      </div>
    </ProjectsProvider>
  );
};

export default Dashboard;
