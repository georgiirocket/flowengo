import type { IProject as schema1 } from "./schemas/1.ts";
import type { PROJECT_SCHEMA } from "./project-schema.ts";

export interface IProjectsData<T> {
  version: string;
  schema: PROJECT_SCHEMA;
  projects: T[];
}

export type IProjects = IProjectsData<schema1>;
