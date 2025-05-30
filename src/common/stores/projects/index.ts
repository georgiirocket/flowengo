import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { OutputBackend } from "@common/interfaces/input-backend";
import type { IProjects } from "./types.ts";
import { generateProjectData } from "./generate.ts";

export interface ProjectsStore {
  projectsData: IProjects;
}

export interface Store extends ProjectsStore {}

export const createProjectsStore = (initData: OutputBackend) => {
  return create<Store>()(
    immer(() => ({
      projectsData: generateProjectData(initData),
    })),
  );
};
