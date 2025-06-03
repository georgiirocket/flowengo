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
  getProject(): NewProjectsStore["newProject"];
}

export const createNewProjectsStore = () => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      newProject: createInitProject(),

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

      getProject() {
        const { newProject } = get();

        return {
          ...newProject,
          title: newProject.title.length ? newProject.title : "No name",
          steps: newProject.steps.length
            ? newProject.steps.map((step) => ({
                ...step,
                title: step.title.length ? step.title : "No name",
              }))
            : createInitSteps(),
        };
      },
    })),
  );
};

function createInitProject(): IProjects["projects"][0] {
  return {
    id: v4(),
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    steps: createInitSteps(),
    color: COLORS.default,
  };
}

function createInitSteps(): IProjects["projects"][0]["steps"] {
  return [
    { id: v4(), title: "Backlog", items: [] },
    { id: v4(), title: "In progress", items: [] },
    { id: v4(), title: "Done", items: [] },
  ];
}
