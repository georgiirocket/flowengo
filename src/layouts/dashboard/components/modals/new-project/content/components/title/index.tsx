import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Input } from "@heroui/input";

const Title: FC = () => {
  const title = useNewProjectCtxStore((state) => state.newProject.title);
  const setTitle = useNewProjectCtxStore((state) => state.setTitle);

  return (
    <Input
      size="sm"
      label="Name"
      type="text"
      value={title}
      onValueChange={setTitle}
    />
  );
};

export default Title;
