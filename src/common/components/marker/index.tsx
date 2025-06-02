import type { FC } from "react";
import { COLORS } from "@common/constants/colors";

interface Props {
  color?: string;
}

const Marker: FC<Props> = ({ color }) => {
  return (
    <div
      className="size-[15px] rounded-full border-1"
      style={{ backgroundColor: color ?? COLORS.default }}
    />
  );
};

export default Marker;
