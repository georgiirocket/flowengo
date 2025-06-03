import type { FC } from "react";
import { Button } from "@heroui/button";
import { useAppCtxStore } from "@common/providers/app";
import { IoIosSettings } from "react-icons/io";
import { openUserModal } from "@layouts/dashboard/components/modals/hooks/use-user-modal.ts";

const UserSettingsButton: FC = () => {
  const userName = useAppCtxStore((state) => state.user_name);

  return (
    <Button
      size="sm"
      className="max-w-[150px] overflow-hidden justify-start"
      endContent={<IoIosSettings className="shrink-0" size={20} />}
      onPress={() => openUserModal()}
    >
      <span className="w-full text-ellipsis overflow-hidden">{userName}</span>
    </Button>
  );
};

export default UserSettingsButton;
