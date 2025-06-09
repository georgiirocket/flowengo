import type { FC } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import Content from "./content";
import { EditStepItemProvider } from "./provider";
import { useEditStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-edit-step-item.ts";

const EditProjectModal: FC = () => {
  const { isOpen, close, getPayload } = useEditStepItemModal();

  return (
    <Modal
      scrollBehavior="inside"
      size="2xl"
      isOpen={isOpen}
      onOpenChange={close}
    >
      <ModalContent>
        {(close) => (
          <EditStepItemProvider data={getPayload()}>
            <Content close={close} />
          </EditStepItemProvider>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProjectModal;
