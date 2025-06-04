import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openNewProjectModal = (): void => {
  emit(EVENTS.newProject).catch((e) => {
    console.error("New project modal: ", e);
  });
};

export const useNewProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unlisten = listen(EVENTS.newProject, () => {
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { isOpen, setIsOpen };
};
