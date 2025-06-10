import type { FC } from "react";
import { useNewStepItemCtxStore } from "../../../provider";
import Editor from "@common/components/editor";

const Description: FC = () => {
  const description = useNewStepItemCtxStore((state) => state.item.description);
  const setDescription = useNewStepItemCtxStore(
    (state) => state.setDescription,
  );

  return (
    <Editor
      isStickyToolbar
      value={description}
      onValueChange={setDescription}
    />
  );
};

export default Description;
