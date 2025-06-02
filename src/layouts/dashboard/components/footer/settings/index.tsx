import type { FC } from "react";
import { ButtonGroup } from "@heroui/react";
import { Button } from "@heroui/button";
import { useAppCtxStore } from "@common/providers/app";
import { IoIosSettings } from "react-icons/io";

const Settings: FC = () => {
  const userName = useAppCtxStore((state) => state.user_name);

  return (
    <ButtonGroup>
      <Button size="sm" className="max-w-[100px] overflow-hidden justify-start">
        <span className="w-full text-ellipsis overflow-hidden">{userName}</span>
      </Button>
      <Button isIconOnly size="sm">
        <IoIosSettings size={20} />
      </Button>
    </ButtonGroup>
  );
};

export default Settings;
