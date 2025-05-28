import type { FC } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";

const Dashboard: FC = () => {
  const { data } = useSWR("protected", () => getProtectedData<string>(), {
    suspense: true,
  });

  if (data?.error) {
    throw new Error(data.error);
  }

  return (
    <div>
      <h1>Hello Dashboard</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default Dashboard;
