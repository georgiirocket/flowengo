import type { FC } from "react";
import { Textarea } from "@heroui/react";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";

const Description: FC = () => {
  const description = useEditProjectCtxStore(
    (state) => state.project.description,
  );
  const setDescription = useEditProjectCtxStore(
    (state) => state.setDescription,
  );

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
