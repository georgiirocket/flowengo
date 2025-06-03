import { useEffect, useState } from "react";
import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const openNewProjectModal = (): void => {
  emit(EVENTS.newProject).catch((e) => {
    console.error("New project modal: ", e);
  });
};

export const useNewProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let unlistenFn: UnlistenFn | null = null;

    listen(EVENTS.newProject, () => {
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
