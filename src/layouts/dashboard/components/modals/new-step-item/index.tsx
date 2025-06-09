import type { FC } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import Content from "./content";
import { NewStepItemProvider } from "./provider";
import { useNewStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-new-step-item.ts";

const EditProjectModal: FC = () => {
  const { isOpen, close, getPayload } = useNewStepItemModal();

  return (
    <Modal
      scrollBehavior="inside"
      size="2xl"
      isOpen={isOpen}
      onOpenChange={close}
    >
      <ModalContent>
        {(close) => (
          <NewStepItemProvider data={getPayload()}>
            <Content close={close} />
          </NewStepItemProvider>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProjectModal;
