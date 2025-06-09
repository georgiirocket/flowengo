import type { FC } from "react";
import { useNewStepItemCtxStore } from "@layouts/dashboard/components/modals/new-step-item/provider";
import Editor from "@common/components/editor";

const Description: FC = () => {
  const description = useNewStepItemCtxStore((state) => state.item.description);
  const setDescription = useNewStepItemCtxStore(
    (state) => state.setDescription,
  );

  return <Editor value={description} onValueChange={setDescription} />;
};

export default Description;
