import type { IProjects } from "@common/stores/projects/types.ts";

export const saveLocalProjectId = (id: string) => {
  window.localStorage.setItem("project_id", id);
};

export const getLocalProjectId = (data: IProjects): string | null => {
  const localId = window.localStorage.getItem("project_id");

  if (!localId && !data.projects.length) {
    return null;
  }

  const existProject = data.projects.find((project) => project.id === localId);

  if (existProject) {
    return localId;
  }

  const [firstProject] = data.projects;

  return firstProject.id;
};
