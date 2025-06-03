import type { IProjects } from "./types.ts";
import { PROJECT_SCHEMA } from "./project-schema.ts";

export const projectsInitial: IProjects = {
  version: "1.0.0",
  schema: PROJECT_SCHEMA.schema1,
  projects: [
    {
      id: "project-1",
      title: "My project",
      description: "About my project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      steps: [
        {
          id: "step-1",
          title: "Backlog",
          items: [
            {
              id: "item-1",
              title: "Integration with API",
              description: "Check the API documentation",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        },
        {
          id: "step-2",
          title: "In progress",
          items: [],
        },
        {
          id: "step-3",
          title: "Done",
          items: [],
        },
      ],
    },
  ],
};
