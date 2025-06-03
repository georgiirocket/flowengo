import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { OutputBackend } from "@common/interfaces/input-backend";
import type { IProjects } from "./types.ts";
import { generateProjectData } from "./generate.ts";
import { v4 } from "uuid";

export interface ProjectsStore {
  projectsData: IProjects;
}

export interface Store extends ProjectsStore {
  addNewProject(project: IProjects["projects"][0]): void;
}

export const createProjectsStore = (initData: OutputBackend) => {
  return create<Store>()(
    immer<Store>((set) => ({
      projectsData: generateProjectData(initData),

      addNewProject(project) {
        set((state) => {
          state.projectsData.projects.push(project);
          state.projectsData.version = v4();
        });
      },
    })),
  );
};
