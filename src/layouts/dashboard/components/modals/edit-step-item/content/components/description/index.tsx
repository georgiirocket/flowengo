import type { FC } from "react";
import { useEditStepItemCtxStore } from "../../../provider";
import Editor from "@common/components/editor";

const Description: FC = () => {
  const description = useEditStepItemCtxStore(
    (state) => state.item.description,
  );
  const setDescription = useEditStepItemCtxStore(
    (state) => state.setDescription,
  );

  return <Editor value={description} onValueChange={setDescription} />;
};

export default Description;
