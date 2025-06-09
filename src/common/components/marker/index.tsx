import type { FC } from "react";
import { COLORS } from "@common/constants/colors";
import { Button } from "@heroui/button";
import type { ButtonProps } from "@heroui/react";

interface Props {
  color?: string;
  className?: string;
  onPress?: ButtonProps["onPress"];
}

const Marker: FC<Props> = ({ color, className, onPress }) => {
  return (
    <Button
      radius="full"
      size="sm"
      isIconOnly
      variant="shadow"
      className={className}
      onPress={onPress}
    >
      <div
        className="size-[15px] rounded-full"
        style={{ backgroundColor: color ?? COLORS.default }}
      />
    </Button>
  );
};

export default Marker;
