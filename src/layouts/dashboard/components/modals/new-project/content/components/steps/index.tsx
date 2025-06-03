import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Button, ButtonGroup } from "@heroui/button";
import { IoIosTrash } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@heroui/input";

const Steps: FC = () => {
  const steps = useNewProjectCtxStore((state) => state.newProject.steps);
  const removeStep = useNewProjectCtxStore((state) => state.removeStep);
  const setStepTitle = useNewProjectCtxStore((state) => state.setStepTitle);

  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence initial={false}>
        {steps.map(({ id, title }) => (
          <motion.div
            key={id}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.2 }}
            className="flex gap-2"
          >
            <Input
              size="sm"
              type="text"
              value={title}
              onValueChange={(v) => setStepTitle(id, v)}
            />
            <ButtonGroup>
              <Button
                color="danger"
                isIconOnly
                size="sm"
                onPress={() => removeStep(id)}
              >
                <IoIosTrash size={20} />
              </Button>
              <Button isIconOnly size="sm">
                <MdDragHandle size={20} />
              </Button>
            </ButtonGroup>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Steps;
