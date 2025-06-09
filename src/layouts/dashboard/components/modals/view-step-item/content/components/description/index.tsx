import type { FC } from "react";
import { useViewStepItemCtxStore } from "../../../provider";
import Editor from "@common/components/editor";

const Description: FC = () => {
  const description = useViewStepItemCtxStore(
    (state) => state.item.description,
  );

  return <Editor isView value={description} />;
};

export default Description;
