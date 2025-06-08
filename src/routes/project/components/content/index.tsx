import type { FC } from "react";
import type { IProjects } from "@common/stores/projects/types.ts";
import { DndContext } from "@dnd-kit/core";
import Column from "./components/column";
import { useDragHandler } from "./hooks/use-drag-handler.ts";

interface Props {
  project: IProjects["projects"][0];
}

const Content: FC<Props> = ({ project }) => {
  const { dragOverHandler, dragEndHandler } = useDragHandler(project);

  return (
    <div className="w-[calc(100dvw-1rem)] h-full overflow-hidden">
      <div
        className="grid gap-2 min-w-full h-full py-2 px-1 overflow-auto grid-rows-1"
        style={{
          gridTemplateColumns: `repeat(${project.steps.length}, 270px)`,
        }}
      >
        <DndContext
          autoScroll
          onDragEnd={dragEndHandler}
          onDragOver={dragOverHandler}
        >
          {project.steps.map((s) => (
            <Column key={s.id} projectId={project.id} step={s} />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Content;
