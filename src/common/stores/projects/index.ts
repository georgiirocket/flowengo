import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { OutputBackend } from "@common/interfaces/input-backend";
import type { IProjects } from "./types.ts";
import { generateProjectData } from "./generate.ts";
import { v4 } from "uuid";
import { saveLocalProjectId } from "@common/helpers/save-local-project-id.ts";

export interface ProjectsStore {
  projectsData: IProjects;
}

export interface Store extends ProjectsStore {
  addNewProject(project: IProjects["projects"][0]): void;
  updateProject(project: IProjects["projects"][0]): void;
  removeProject(projectId: string): void;
  getFirstProjectId(): string | null;
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
    })),
  );
};
