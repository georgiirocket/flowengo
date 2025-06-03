import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IProjects } from "@common/stores/projects/types.ts";
import { v4 } from "uuid";
import { COLORS } from "@common/constants/colors";

export interface NewProjectsStore {
  newProject: IProjects["projects"][0];
}

export interface Store extends NewProjectsStore {
  setTitle(text: string): void;
  setDescription(text: string): void;
  createNewStep(text: string): void;
  removeStep(stepId: string): void;
  setStepTitle(id: string, text: string): void;
  reorderSteps(stepIds: string[]): void;
  setColor(color: COLORS): void;
}

export const createNewProjectsStore = () => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      newProject: {
        id: v4(),
        title: "New project",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        steps: [
          { id: v4(), title: "Backlog", items: [] },
          { id: v4(), title: "In progress", items: [] },
          { id: v4(), title: "Done", items: [] },
        ],
        color: COLORS.default,
      },

      setTitle(text) {
        set((state) => {
          state.newProject.title = text;
        });
      },

      setDescription(text) {
        set((state) => {
          state.newProject.description = text;
        });
      },

      createNewStep(text) {
        set((state) => {
          state.newProject.steps.push({
            id: v4(),
            title: text,
            items: [],
          });
        });
      },

      removeStep(stepId) {
        set((state) => {
          state.newProject.steps = state.newProject.steps.filter(
            ({ id }) => id !== stepId,
          );
        });
      },

      setStepTitle(stepId, text) {
        set((state) => {
          const step = state.newProject.steps.find(({ id }) => id === stepId);

          if (step) {
            step.title = text;
          }
        });
      },

      reorderSteps(stepIds) {
        const steps = get().newProject.steps;

        const reorderedSteps: typeof steps = [];

        for (const stepId of stepIds) {
          const step = steps.find(({ id }) => id === stepId);

          if (step) {
            reorderedSteps.push(step);
          }
        }

        set((state) => {
          state.newProject.steps = reorderedSteps;
        });
      },

      setColor(color) {
        set((state) => {
          state.newProject.color = color;
        });
      },
    })),
  );
};
