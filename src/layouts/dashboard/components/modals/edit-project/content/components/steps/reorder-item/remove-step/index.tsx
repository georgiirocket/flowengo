import type { FC } from "react";
import type { IProjects } from "@common/stores/projects/types.ts";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";
import { IoIosTrash } from "react-icons/io";
import { Button } from "@heroui/button";

const RemoveStepButton: FC<{
  step: IProjects["projects"][0]["steps"][0];
}> = ({ step }) => {
  const removeStep = useEditProjectCtxStore((state) => state.removeStep);

  return (
    <Button
      color="danger"
      isIconOnly
      size="sm"
      onPress={() => removeStep(step.id)}
    >
      <IoIosTrash size={20} />
    </Button>
  );
};

export default RemoveStepButton;
