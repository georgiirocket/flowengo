import type { FC } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import Content from "./content";
import { useNewProjectModal } from "@layouts/dashboard/components/modals/hooks/use-new-project.ts";

const NewProjectModal: FC = () => {
  const { isOpen, setIsOpen } = useNewProjectModal();

  return (
    <Modal
      scrollBehavior="inside"
      size="2xl"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalContent>{(close) => <Content close={close} />}</ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
