import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export type NewStepPayload = {
  projectId: string;
  stepId: string;
};

export const openNewStepItemModal = (payload: NewStepPayload): void => {
  emit(EVENTS.newStepItem, payload).catch((e) => {
    console.error("New step item modal: ", e);
  });
};

export const useNewStepItemModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<NewStepPayload | null>(null);

  const close = (): void => {
    setIsOpen(false);
    setPayload(null);
  };

  const getPayload = (): NewStepPayload => {
    if (!payload) {
      throw new Error("Payload not found");
    }

    return payload;
  };

  useEffect(() => {
    const unlisten = listen<NewStepPayload>(EVENTS.newStepItem, (event) => {
      setPayload(event.payload);
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { isOpen, close, getPayload };
};
