import type { FC } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { COLORS } from "@common/constants/colors";
import { Button } from "@heroui/button";

const Colors: FC = () => {
  const color = useNewProjectCtxStore(
    (state) => state.newProject?.color ?? COLORS.default,
  );
  const setColor = useNewProjectCtxStore((state) => state.setColor);

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
