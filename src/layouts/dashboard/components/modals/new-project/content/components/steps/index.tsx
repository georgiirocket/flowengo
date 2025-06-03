import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Reorder } from "framer-motion";
import ReorderItem from "./reorder-item";

const Steps: FC = () => {
  const steps = useNewProjectCtxStore((state) => state.newProject.steps);
  const reorderSteps = useNewProjectCtxStore((state) => state.reorderSteps);

  return (
    <div className="flex flex-col gap-1">
      <Reorder.Group
        values={steps.map(({ id }) => id)}
        onReorder={reorderSteps}
        initial={false}
        as="div"
      >
        {steps.map(({ id, title }) => (
          <ReorderItem key={id} id={id} title={title} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Steps;
