import type { FC } from "react";
import { COLORS } from "@common/constants/colors";
import { Button } from "@heroui/button";

interface Props {
  color?: string;
  className?: string;
}

const Marker: FC<Props> = ({ color, className }) => {
  return (
    <Button
      radius="full"
      size="sm"
      isIconOnly
      variant="shadow"
      className={className}
    >
      <div
        className="size-[15px] rounded-full"
        style={{ backgroundColor: color ?? COLORS.default }}
      />
    </Button>
  );
};

export default Marker;
