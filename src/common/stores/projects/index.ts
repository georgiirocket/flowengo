import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { OutputBackend } from "@common/interfaces/input-backend";
import type { IProjects } from "./types.ts";
import { generateProjectData } from "./generate.ts";
import { v4 } from "uuid";
import { saveLocalProjectId } from "@common/helpers/save-local-project-id.ts";

interface ReorderItemsData {
  projectId: string;
  stepId: string;
  items: IProjects["projects"][0]["steps"][0]["items"];
}

interface MoveItemToStepData {
  projectId: string;
  oldStepId: string;
  newStepId: string;
  itemId: string;
}

interface NewStepItemData {
  projectId: string;
  stepId: string;
  item: IProjects["projects"][0]["steps"][0]["items"][0];
}

interface EditStepItemData {
  projectId: string;
  stepId: string;
  item: IProjects["projects"][0]["steps"][0]["items"][0];
}

interface RemoveStepItemData {
  projectId: string;
  stepId: string;
  itemId: string;
}

export interface ProjectsStore {
  projectsData: IProjects;
}

export interface Store extends ProjectsStore {
  addNewProject(project: IProjects["projects"][0]): void;
  updateProject(project: IProjects["projects"][0]): void;
  removeProject(projectId: string): void;
  getFirstProjectId(): string | null;
  reOrderItems(data: ReorderItemsData): void;
  moveItemToStep(data: MoveItemToStepData): void;
  createNewStepItem(data: NewStepItemData): void;
  editStepItem(data: EditStepItemData): void;
  removeStepItem(data: RemoveStepItemData): void;
}

export const createProjectsStore = (initData: OutputBackend) => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      projectsData: generateProjectData(initData),

      addNewProject(project) {
        set((state) => {
          state.projectsData.projects.push(project);
          state.projectsData.version = v4();
        });
      },

      updateProject(project) {
        set((state) => {
          state.projectsData.projects = state.projectsData.projects.map((p) => {
            if (p.id === project.id) {
              return project;
            }

            return p;
          });
          state.projectsData.version = v4();
        });
      },

      removeProject(projectId) {
        const { getFirstProjectId } = get();

        set((state) => {
          state.projectsData.projects = state.projectsData.projects.filter(
            (p) => p.id !== projectId,
          );
          state.projectsData.version = v4();
        });

        saveLocalProjectId(getFirstProjectId());
      },

      getFirstProjectId() {
        const { projectsData } = get();

        if (!projectsData.projects.length) {
          return null;
        }

        const [firstProject] = projectsData.projects;

        return firstProject.id;
      },

      reOrderItems(data) {
        const { projectId, stepId, items } = data;

        set((state) => {
          const project = state.projectsData.projects.find(
            (p) => p.id === projectId,
          );

          if (project) {
            const step = project.steps.find((s) => s.id === stepId);

            if (step) {
              step.items = items;
              state.projectsData.version = v4();
            }
          }
        });
      },

      moveItemToStep(data) {
        const { projectId, oldStepId, newStepId, itemId } = data;

        const { projectsData } = get();
        const project = projectsData.projects.find((p) => p.id === projectId);

        if (!project) {
          return;
        }

        const step = project.steps.find((s) => s.id === oldStepId);
        const newStep = project.steps.find((s) => s.id === newStepId);

        if (!step || !newStep) {
          return;
        }

        const item = step.items.find((i) => i.id === itemId);

        if (!item) {
          return;
        }

        const tempItem = structuredClone(item);

        set((state) => {
          const project = state.projectsData.projects.find(
            (p) => p.id === projectId,
          );

          if (project) {
            project.steps = project.steps.map((s) => {
              if (s.id === oldStepId) {
                return { ...s, items: s.items.filter((i) => i.id !== itemId) };
              }

              if (s.id === newStepId) {
                return { ...s, items: [...s.items, tempItem] };
              }

              return s;
            });

            state.projectsData.version = v4();
          }
        });
      },

      createNewStepItem(data) {
        const { projectId, stepId, item } = data;

        set((state) => {
          const project = state.projectsData.projects.find(
            (p) => p.id === projectId,
          );

          if (project) {
            const step = project.steps.find((s) => s.id === stepId);

            if (step) {
              step.items.unshift(item);
              state.projectsData.version = v4();
            }
          }
        });
      },

      editStepItem(data) {
        const { projectId, stepId, item } = data;

        set((state) => {
          const project = state.projectsData.projects.find(
            (p) => p.id === projectId,
          );

          if (project) {
            const step = project.steps.find((s) => s.id === stepId);

            if (step) {
              step.items = step.items.map((i) => {
                if (i.id === item.id) {
                  return item;
                }

                return i;
              });

              state.projectsData.version = v4();
            }
          }
        });
      },

      removeStepItem(data) {
        const { projectId, stepId, itemId } = data;

        set((state) => {
          const project = state.projectsData.projects.find(
            (p) => p.id === projectId,
          );

          if (project) {
            const step = project.steps.find((s) => s.id === stepId);

            if (step) {
              step.items = step.items.filter((i) => i.id !== itemId);
              state.projectsData.version = v4();
            }
          }
        });
      },
    })),
  );
};
