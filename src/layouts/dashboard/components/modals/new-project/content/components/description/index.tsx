import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Textarea } from "@heroui/react";

const Description: FC = () => {
  const description = useNewProjectCtxStore(
    (state) => state.newProject.description,
  );
  const setDescription = useNewProjectCtxStore((state) => state.setDescription);

  return (
    <Textarea
      size="sm"
      label="Description"
      type="text"
      value={description}
      onValueChange={setDescription}
    />
  );
};

export default Description;
