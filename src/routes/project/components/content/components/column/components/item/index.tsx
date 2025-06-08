import type { IProjects } from "@common/stores/projects/types.ts";
import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  projectId: string;
  item: IProjects["projects"][0]["steps"][0]["items"][0];
}

const Item: FC<Props> = ({ item }) => {
  const { id, title } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className="w-full h-[200px] bg-red-500 cursor-grab [&:not(:last-child)]:mb-2"
    >
      {title}
    </motion.div>
  );
};

export default Item;
