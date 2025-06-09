import type { FC } from "react";
import { Button } from "@heroui/button";
import { openNewStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-new-step-item.ts";

interface Props {
  projectId: string;
  stepId: string;
  title: string;
}

const Header: FC<Props> = ({ title, projectId, stepId }) => {
  return (
    <div className="w-full h-[24px] flex gap-1 pb-0 items-start overflow-hidden select-none">
      <span className="w-full uppercase text-ellipsis overflow-hidden text-nowrap">
        {title}
      </span>
      <Button
        radius="sm"
        size="sm"
        className="h-full"
        onPress={() => openNewStepItemModal({ projectId, stepId })}
      >
        Add More
      </Button>
    </div>
  );
};

export default Header;
