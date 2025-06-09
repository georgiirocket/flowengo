import type { PROJECT_SCHEMA } from "../project-schema.ts";
import type { JSONContent } from "@tiptap/react";

export interface IStepItem {
  id: string;
  title: string;
  description: JSONContent;
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
  description: string;
  steps: IProjectStep[];
  createdAt: string;
  updatedAt: string;
  color?: string;
}

export interface IProjectsData {
  version: string;
  schema: PROJECT_SCHEMA.schema1;
  projects: IProject[];
}
