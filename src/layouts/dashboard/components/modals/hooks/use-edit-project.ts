import { useEffect, useState } from "react";
import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";
import type { IProjects } from "@common/stores/projects/types.ts";

type Payload = IProjects["projects"][0];

export const openEditProjectModal = (payload: Payload): void => {
  emit(EVENTS.editProject, payload).catch((e) => {
    console.error("Edit project modal: ", e);
  });
};

export const useEditProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<Payload | null>(null);

  const close = (): void => {
    setIsOpen(false);
    setPayload(null);
  };

  const getPayload = (): Payload => {
    if (!payload) {
      throw new Error("Payload not found");
    }

    return payload;
  };

  useEffect(() => {
    let unlistenFn: UnlistenFn | null = null;

    listen<Payload>(EVENTS.editProject, (event) => {
      setPayload(event.payload);
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

  return { isOpen, close, getPayload };
};
