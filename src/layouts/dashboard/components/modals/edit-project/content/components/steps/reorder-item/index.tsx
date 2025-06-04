import type { FC } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { MdDragHandle } from "react-icons/md";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";
import type { IProjects } from "@common/stores/projects/types.ts";
import RemoveStepDropdown from "./remove-dropdown";
import RemoveStepButton from "./remove-step";

const ReorderItem: FC<{ step: IProjects["projects"][0]["steps"][0] }> = ({
  step,
}) => {
  const setStepTitle = useEditProjectCtxStore((state) => state.setStepTitle);
  const controls = useDragControls();

  const isExistItems = !!step.items.length;

  return (
    <Reorder.Item
      id={step.id}
      value={step.id}
      dragListener={false}
      dragControls={controls}
      as="div"
      className="flex gap-2 py-1 items-center"
      initial={false}
      exit={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.2 }}
    >
      <Input
        size="sm"
        type="text"
        value={step.title}
        onValueChange={(v) => setStepTitle(step.id, v)}
      />
      {isExistItems ? (
        <RemoveStepDropdown step={step} />
      ) : (
        <RemoveStepButton step={step} />
      )}
      <Button
        isIconOnly
        size="sm"
        style={{ touchAction: "none" }}
        onPointerDown={(e) => controls.start(e)}
      >
        <MdDragHandle size={20} />
      </Button>
    </Reorder.Item>
  );
};

export default ReorderItem;
