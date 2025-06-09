import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";
import type { IProjects } from "@common/stores/projects/types.ts";

export type ViewStepPayload = {
  projectId: string;
  stepId: string;
  item: IProjects["projects"][0]["steps"][0]["items"][0];
};

export const openViewStepItemModal = (payload: ViewStepPayload): void => {
  emit(EVENTS.viewStepItem, payload).catch((e) => {
    console.error("New step item modal: ", e);
  });
};

export const useViewStepItemModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<ViewStepPayload | null>(null);

  const close = (): void => {
    setIsOpen(false);
    setPayload(null);
  };

  const getPayload = (): ViewStepPayload => {
    if (!payload) {
      throw new Error("Payload not found");
    }

    return payload;
  };

  useEffect(() => {
    const unlisten = listen<ViewStepPayload>(EVENTS.viewStepItem, (event) => {
      setPayload(event.payload);
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { isOpen, close, getPayload };
};
