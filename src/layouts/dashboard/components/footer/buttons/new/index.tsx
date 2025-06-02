import type { FC } from "react";
import { Button } from "@heroui/button";
import ReactLogo from "@assets/icon-sq.svg?react";

const NewProjectButton: FC = () => {
  return (
    <Button
      startContent={<ReactLogo className="size-[20px]" />}
      size="sm"
      color="primary"
    >
      New
    </Button>
  );
};

export default NewProjectButton;
