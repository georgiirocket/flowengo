import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openUserModal = (): void => {
  emit(EVENTS.userModal).catch((e) => {
    console.error("Open user modal: ", e);
  });
};

export const useUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unlisten = listen(EVENTS.userModal, () => {
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { isOpen, setIsOpen };
};
