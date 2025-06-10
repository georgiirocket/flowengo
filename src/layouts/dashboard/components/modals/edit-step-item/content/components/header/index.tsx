import type { FC } from "react";
import { useEditStepItemCtxStore } from "../../../provider";
import Marker from "@common/components/marker";

const Header: FC = () => {
  const color = useEditStepItemCtxStore((state) => state.item.color);

  return (
    <>
      <Marker color={color} />
      <span>Edit task</span>
    </>
  );
};

export default Header;
