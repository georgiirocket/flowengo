import { useEffect, useState } from "react";
import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openRemoveDataModal = () => {
  emit(EVENTS.dropData).catch((e) => {
    console.error("Open remove data modal: ", e);
  });
};

export const useDropDataModal = () => {
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

  return { isOpen, setIsOpen };
};
