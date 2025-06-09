import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import { useViewStepItemCtxStore } from "../provider";
import { openEditStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-edit-step-item.ts";
import { CiEdit } from "react-icons/ci";
import Marker from "@common/components/marker";

const Content: FC<{ close: () => void }> = ({ close }) => {
  const { getStoreResult, item } = useViewStepItemCtxStore((state) => state);

  const goToEdit = (): void => {
    const { projectId, stepId, item } = getStoreResult();

    openEditStepItemModal({ projectId, stepId, item });
    close();
  };

  return (
    <>
      <ModalHeader className="flex gap-2 items-center">
        <Marker color={item.color} />
        <span>View task</span>
      </ModalHeader>
      <ModalBody className="gap-2">
        <Title />
        <Description />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onPress={goToEdit}
          className="mr-auto"
          startContent={<CiEdit size={15} />}
        >
          Edit mode
        </Button>
        <Button size="sm" onPress={close}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
};

export default Content;
