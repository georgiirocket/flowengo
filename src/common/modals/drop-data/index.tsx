import type { FC } from "react";
import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import type { UnlistenFn } from "@tauri-apps/api/event";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { EVENTS } from "@common/events";
import { dropAllData } from "@common/actions/dpop-all-data";
import { useAppCtxStore } from "@common/providers/app";

const DropDataModal: FC = () => {
  const clearAppState = useAppCtxStore((state) => state.clear);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let unlistenFn: UnlistenFn | null = null;

    listen(EVENTS.dropData, () => {
      setIsOpen(true);
    })
      .then((fn) => {
        unlistenFn = fn;
      })
      .catch(console.error);

    return () => {
      unlistenFn?.();
    };
  }, []);

  const onRemoveData = async () => {
    await dropAllData();
    clearAppState();

    window.location.href = "/";
  };

  if (!isOpen) return null;

  return (
    <Modal size="md" isOpen onOpenChange={setIsOpen}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Remove user data
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete all data?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onRemoveData}>
            Remove
          </Button>
          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DropDataModal;
