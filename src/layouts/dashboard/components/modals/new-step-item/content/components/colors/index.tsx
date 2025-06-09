import type { FC } from "react";
import { COLORS } from "@common/constants/colors";
import { Button } from "@heroui/button";
import { useNewStepItemCtxStore } from "../../../provider";

const Colors: FC = () => {
  const color = useNewStepItemCtxStore(
    (state) => state.item?.color ?? COLORS.zic,
  );
  const setColor = useNewStepItemCtxStore((state) => state.setColor);

  return (
    <div className="flex gap-2 flex-wrap">
      {Object.values(COLORS).map((c) => (
        <Button
          key={c}
          radius="full"
          size="sm"
          isIconOnly
          onPress={() => setColor(c)}
          variant={c === color ? "shadow" : "light"}
        >
          <span
            className="size-[20px] rounded-full"
            style={{ backgroundColor: c }}
          />
        </Button>
      ))}
    </div>
  );
};

export default Colors;
