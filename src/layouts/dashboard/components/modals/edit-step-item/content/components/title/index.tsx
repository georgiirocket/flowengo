import type { FC } from "react";
import { useEditStepItemCtxStore } from "../../../provider";
import { Textarea } from "@heroui/input";

const Title: FC = () => {
  const title = useEditStepItemCtxStore((state) => state.item.title);
  const setTitle = useEditStepItemCtxStore((state) => state.setTitle);

  return (
    <Textarea
      size="sm"
      label="Title"
      type="text"
      placeholder="Enter the title"
      value={title}
      onValueChange={setTitle}
    />
  );
};

export default Title;
