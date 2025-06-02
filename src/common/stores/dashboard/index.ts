import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface DashboardModalStore {
  newProjectModalOpen: boolean;
}

export interface Store extends DashboardModalStore {
  setNewProjectModalOpen(open: boolean): void;
}

export const createDashboardModalStore = () => {
  return create<Store>()(
    immer((set) => ({
      newProjectModalOpen: false,

      setNewProjectModalOpen: (open) => {
        set((state) => {
          state.newProjectModalOpen = open;
        });
      },
    })),
  );
};
