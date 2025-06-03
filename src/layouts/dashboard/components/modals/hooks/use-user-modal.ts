import { useEffect, useState } from "react";
import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openUserModal = (): void => {
  emit(EVENTS.userModal).catch((e) => {
    console.error("Open user modal: ", e);
  });
};

export const useUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let unlistenFn: UnlistenFn | null = null;

    listen(EVENTS.userModal, () => {
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

  return { isOpen, setIsOpen };
};
