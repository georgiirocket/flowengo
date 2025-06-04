import type { FC } from "react";
import { Input } from "@heroui/input";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";

const Title: FC = () => {
  const title = useEditProjectCtxStore((state) => state.project.title);
  const setTitle = useEditProjectCtxStore((state) => state.setTitle);

  return (
    <Input
      size="sm"
      label="Name"
      type="text"
      placeholder="Enter project name"
      value={title}
      onValueChange={setTitle}
    />
  );
};

export default Title;
