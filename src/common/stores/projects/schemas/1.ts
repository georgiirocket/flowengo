import type { PROJECT_SCHEMA } from "./project-schema.ts";

export interface IStepItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

export interface IProjectStep {
  id: string;
  title: string;
  items: IStepItem[];
}

export interface IProject {
  id: string;
  title: string;
  steps: IProjectStep[];
  createdAt: string;
  updatedAt: string;
  color?: string;
}

export interface IProjectsData {
  version: string;
  schema: PROJECT_SCHEMA.shema1;
  projects: IProject[];
}
