import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IProjects } from "@common/stores/projects/types.ts";
import type { COLORS } from "@common/constants/colors";
import type { EditStepPayload } from "@layouts/dashboard/components/modals/hooks/use-edit-step-item.ts";

export interface EditStepStore extends EditStepPayload {
  item: IProjects["projects"][0]["steps"][0]["items"][0];
}

export interface Store extends EditStepStore {
  setTitle(text: string): void;
  setDescription(text: string): void;
  setColor(color: COLORS): void;
  getStoreResult(): Pick<EditStepStore, "projectId" | "stepId" | "item">;
}

export const createEditStepItemStore = (init: EditStepPayload) => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      projectId: init.projectId,
      stepId: init.stepId,
      item: init.item,

      setTitle(text) {
        set((state) => {
          state.item.title = text;
        });
      },

      setDescription(json) {
        set((state) => {
          state.item.description = json;
        });
      },

      setColor(color) {
        set((state) => {
          state.item.color = color;
        });
      },

      getStoreResult() {
        const { projectId, stepId, item } = get();

        return {
          projectId,
          stepId,
          item: {
            ...item,
            title: item.title.length ? item.title : "New task",
            updatedAt: new Date().toISOString(),
          },
        };
      },
    })),
  );
};
