import type { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { dropAllData } from "@common/actions/dpop-all-data";
import { useAppCtxStore } from "@common/providers/app";
import { useDropDataModal } from "@common/hooks/use-drop-data-modal.ts";

const DropDataModal: FC = () => {
  const clearAppState = useAppCtxStore((state) => state.clear);
  const { isOpen, setIsOpen } = useDropDataModal();

  const onRemoveData = async () => {
    await dropAllData();
    clearAppState();

    window.location.href = "/";
  };

  if (!isOpen) return null;

  return (
    <Modal size="md" isOpen onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Remove user data
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete all data?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="danger"
                variant="bordered"
                onPress={onRemoveData}
              >
                Remove
              </Button>
              <Button size="sm" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DropDataModal;
