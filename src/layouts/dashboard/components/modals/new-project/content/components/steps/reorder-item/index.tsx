import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Reorder, useDragControls } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IoIosTrash } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";

const ReorderItem: FC<{ id: string; title: string }> = ({ id, title }) => {
  const removeStep = useNewProjectCtxStore((state) => state.removeStep);
  const setStepTitle = useNewProjectCtxStore((state) => state.setStepTitle);
  const controls = useDragControls();

  return (
    <Reorder.Item
      id={id}
      value={id}
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
        value={title}
        onValueChange={(v) => setStepTitle(id, v)}
      />
      <Button
        color="danger"
        isIconOnly
        size="sm"
        onPress={() => removeStep(id)}
      >
        <IoIosTrash size={20} />
      </Button>
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
