import type { FC } from "react";
import { Reorder } from "framer-motion";
import ReorderItem from "./reorder-item";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";

const Steps: FC = () => {
  const steps = useEditProjectCtxStore((state) => state.project.steps);
  const reorderSteps = useEditProjectCtxStore((state) => state.reorderSteps);

  return (
    <div className="flex flex-col gap-1">
      <Reorder.Group
        values={steps.map(({ id }) => id)}
        onReorder={reorderSteps}
        initial={false}
        as="div"
      >
        {steps.map((step) => (
          <ReorderItem key={step.id} step={step} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Steps;
