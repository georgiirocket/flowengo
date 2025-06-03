import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useAppCtxStore } from "@common/providers/app";
import { formatDateFromIso } from "@common/helpers/format-date-from-iso.ts";
import { openRemoveDataModal } from "@common/hooks/use-drop-data-modal.ts";
import { Divider } from "@heroui/divider";
import ThemeComponent from "./theme";

const Content: FC = () => {
  const { user_name, create_date } = useAppCtxStore((state) => state);
  const displayDate = formatDateFromIso(create_date, "dateWithTime");

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Account</ModalHeader>
      <ModalBody className="gap-2">
        <div className="flex justify-between items-center">
          <h1>{user_name}</h1>
          <p className="text-tiny">{displayDate}</p>
        </div>
        <Divider />
        <ThemeComponent />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          color="danger"
          variant="bordered"
          onPress={() => openRemoveDataModal()}
        >
          Remove account
        </Button>
        <Button size="sm">Log out</Button>
      </ModalFooter>
    </>
  );
};

export default Content;
