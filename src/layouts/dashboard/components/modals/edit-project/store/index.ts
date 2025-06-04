import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IProjects } from "@common/stores/projects/types.ts";
import { v4 } from "uuid";
import type { COLORS } from "@common/constants/colors";

export interface EditProjectsStore {
  project: IProjects["projects"][0];
}

export interface Store extends EditProjectsStore {
  setTitle(text: string): void;
  setDescription(text: string): void;
  createNewStep(text: string): void;
  removeStep(stepId: string): void;
  setStepTitle(id: string, text: string): void;
  reorderSteps(stepIds: string[]): void;
  setColor(color: COLORS): void;
  getProject(): EditProjectsStore["project"];
}

export const createEditProjectsStore = (
  project: EditProjectsStore["project"],
) => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      project,

      setTitle(text) {
        set((state) => {
          state.project.title = text;
        });
      },

      setDescription(text) {
        set((state) => {
          state.project.description = text;
        });
      },

      createNewStep(text) {
        set((state) => {
          state.project.steps.push({
            id: v4(),
            title: text,
            items: [],
          });
        });
      },

      removeStep(stepId) {
        set((state) => {
          state.project.steps = state.project.steps.filter(
            ({ id }) => id !== stepId,
          );
        });
      },

      setStepTitle(stepId, text) {
        set((state) => {
          const step = state.project.steps.find(({ id }) => id === stepId);

          if (step) {
            step.title = text;
          }
        });
      },

      reorderSteps(stepIds) {
        const steps = get().project.steps;

        const reorderedSteps: typeof steps = [];

        for (const stepId of stepIds) {
          const step = steps.find(({ id }) => id === stepId);

          if (step) {
            reorderedSteps.push(step);
          }
        }

        set((state) => {
          state.project.steps = reorderedSteps;
        });
      },

      setColor(color) {
        set((state) => {
          state.project.color = color;
        });
      },

      getProject() {
        const { project } = get();

        return {
          ...project,
          updatedAt: new Date().toISOString(),
          title: project.title.length ? project.title : "No name",
          steps: project.steps.length
            ? project.steps.map((step) => ({
                ...step,
                title: step.title.length ? step.title : "No name",
              }))
            : createInitSteps(),
        };
      },
    })),
  );
};

function createInitSteps(): IProjects["projects"][0]["steps"] {
  return [
    { id: v4(), title: "Backlog", items: [] },
    { id: v4(), title: "In progress", items: [] },
    { id: v4(), title: "Done", items: [] },
  ];
}
