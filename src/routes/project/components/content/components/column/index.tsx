import type { IProjects } from "@common/stores/projects/types.ts";
import type { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Header from "./components/header";
import Item from "./components/item";

interface Props {
  projectId: string;
  step: IProjects["projects"][0]["steps"][0];
}

const Column: FC<Props> = ({ step, projectId }) => {
  const { id, title, items } = step;
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="grid h-full gap-2 grid-rows-[auto_1fr]">
      <Header projectId={projectId} stepId={id} title={title} />
      <SortableContext id={id} items={items}>
        <div
          onScroll={(e) => {
            e.currentTarget.scrollLeft = 0;
          }}
          ref={setNodeRef}
          className="w-full overflow-y-auto overflow-x-hidden scroll-hidden"
        >
          {items.map((item) => (
            <Item key={item.id} projectId={projectId} stepId={id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
