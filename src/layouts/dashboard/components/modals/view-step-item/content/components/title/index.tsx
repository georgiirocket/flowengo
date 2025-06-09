import type { FC } from "react";
import { useViewStepItemCtxStore } from "../../../provider";
import { Code } from "@heroui/code";

const Title: FC = () => {
  const title = useViewStepItemCtxStore((state) => state.item.title);

  return (
    <Code className="w-full text-wrap">
      <p>{title}</p>
    </Code>
  );
};

export default Title;
