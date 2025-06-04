import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openRemoveDataModal = () => {
  emit(EVENTS.dropData).catch((e) => {
    console.error("Open remove data modal: ", e);
  });
};

export const useDropDataModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unlisten = listen(EVENTS.dropData, () => {
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { isOpen, setIsOpen };
};
