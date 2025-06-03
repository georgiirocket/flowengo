import type { FC } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import Content from "./content";
import { useNewProjectModal } from "@layouts/dashboard/components/modals/hooks/use-new-project.ts";
import { NewProjectProvider } from "./provider";

const NewProjectModal: FC = () => {
  const { isOpen, setIsOpen } = useNewProjectModal();

  return (
    <Modal
      scrollBehavior="inside"
      size="2xl"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalContent>
        {(close) => (
          <NewProjectProvider>
            <Content close={close} />
          </NewProjectProvider>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
