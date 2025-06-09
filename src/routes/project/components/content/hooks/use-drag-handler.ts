import type { IProjects } from "@common/stores/projects/types.ts";
import { useProjectsCtxStore } from "@common/providers/projects";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useDragHandler = (project: IProjects["projects"][0]) => {
  const { id, steps } = project;
  const reOrderItems = useProjectsCtxStore((state) => state.reOrderItems);
  const moveItemToStep = useProjectsCtxStore((state) => state.moveItemToStep);

  const dragEndHandler = (e: DragEndEvent) => {
    // Check if item is drag into unknown area
    if (!e.over || !e.active.data.current || !e.over.data.current) return;

    // Check if item position is the same
    if (e.active.id === e.over.id) return;

    // Check if item is moved outside the column
    if (
      e.active.data.current.sortable.containerId !==
      e.over.data.current.sortable.containerId
    )
      return;

    const stepId = e.active.data.current.sortable.containerId;
    const over = e.over;

    if (!over) {
      return;
    }

    const step = steps.find((s) => s.id === stepId);

    if (!step) {
      return;
    }

    const { items } = step;

    const oldIdx = items.findIndex((i) => i.id === e.active.id.toString());
    const newIdx = items.findIndex((i) => i.id === over.id.toString());

    reOrderItems({
      projectId: id,
      stepId: step.id,
      items: arrayMove(items, oldIdx, newIdx),
    });
  };

  const dragOverHandler = (e: DragOverEvent) => {
    // Check if item is drag into unknown area
    if (!e.over) return;

    // Get the initial and target sortable list name
    const initialContainer = e.active.data.current?.sortable?.containerId;
    const targetContainer = e.over.data.current?.sortable?.containerId;

    // if there is none initial sortable list name, then item is not sortable item

    if (!initialContainer) return;

    if (!targetContainer) {
      if (initialContainer === e.over.id.toString()) {
        return;
      }

      const newStep = steps.find((s) => s.id === e.over?.id.toString());

      if (!newStep) {
        return;
      }

      moveItemToStep({
        projectId: id,
        itemId: e.active.id.toString(),
        newStepId: e.over.id.toString(),
        oldStepId: initialContainer,
      });

      return;
    }

    if (initialContainer === targetContainer) {
      return;
    }

    if (initialContainer !== targetContainer) {
      moveItemToStep({
        projectId: id,
        itemId: e.active.id.toString(),
        newStepId: targetContainer,
        oldStepId: initialContainer,
      });

      return;
    }
  };

  return { dragEndHandler, dragOverHandler };
};
