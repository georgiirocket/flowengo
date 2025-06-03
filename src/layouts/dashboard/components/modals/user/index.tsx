import type { FC } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import Content from "./content";
import { useUserModal } from "../hooks/use-user-modal";

const UserModal: FC = () => {
  const { isOpen, setIsOpen } = useUserModal();

  return (
    <Modal
      scrollBehavior="inside"
      size="md"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalContent>{() => <Content />}</ModalContent>
    </Modal>
  );
};

export default UserModal;
