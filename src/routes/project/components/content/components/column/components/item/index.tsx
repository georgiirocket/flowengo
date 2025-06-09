import type { IProjects } from "@common/stores/projects/types.ts";
import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { CiEdit } from "react-icons/ci";
import { CiViewTimeline } from "react-icons/ci";
import { Button } from "@heroui/button";
import Marker from "@common/components/marker";
import { MdOutlineUpdate } from "react-icons/md";
import { formatDateFromIso } from "@common/helpers/format-date-from-iso.ts";
import { Divider } from "@heroui/divider";
import { openEditStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-edit-step-item.ts";
import { openViewStepItemModal } from "@layouts/dashboard/components/modals/hooks/use-view-step-item.ts";

interface Props {
  projectId: string;
  stepId: string;
  item: IProjects["projects"][0]["steps"][0]["items"][0];
}

const Item: FC<Props> = ({ item, projectId, stepId }) => {
  const { id, title, color, updatedAt } = item;
  const displayUpdateAt = formatDateFromIso(updatedAt, "dateWithTime");

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
      className="w-full h-[143px] cursor-grab [&:not(:last-child)]:mb-2"
    >
      <Card
        shadow="none"
        className="w-full h-full scroll-hidden border-1 select-none"
        style={{ borderColor: color }}
      >
        <CardBody className="flex flex-col justify-between gap-1 pb-0">
          <p className="line-clamp-2 text-sm">{title}</p>
          <Divider className="my-1" />
          <div className="text-tiny flex justify-start gap-1 items-center">
            <MdOutlineUpdate size={12} />
            <span>{displayUpdateAt}</span>
          </div>
        </CardBody>
        <CardFooter className="justify-end gap-1">
          <Marker
            color={color}
            className="mr-auto"
            onPress={() => openViewStepItemModal({ projectId, stepId, item })}
          />
          <Button
            radius="full"
            size="sm"
            startContent={<CiEdit size={15} />}
            onPress={() => openEditStepItemModal({ projectId, stepId, item })}
          >
            Edit
          </Button>
          <Button
            radius="full"
            size="sm"
            startContent={<CiViewTimeline size={15} />}
            onPress={() => openViewStepItemModal({ projectId, stepId, item })}
          >
            View
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Item;
