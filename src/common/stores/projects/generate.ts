import type { IProjects } from "./types.ts";
import { projectsInitial } from "@common/stores/projects/initial.ts";
import type { OutputBackend } from "@common/interfaces/input-backend";

export const generateProjectData = <T extends OutputBackend>(
  data: T,
): IProjects => {
  if (!data.version || !data.schema) {
    return projectsInitial;
  }

  return data as unknown as IProjects;
};
