import type { FC } from "react";
import { useNewStepItemCtxStore } from "../../../provider";
import { Textarea } from "@heroui/input";

const Title: FC = () => {
  const title = useNewStepItemCtxStore((state) => state.item.title);
  const setTitle = useNewStepItemCtxStore((state) => state.setTitle);

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
