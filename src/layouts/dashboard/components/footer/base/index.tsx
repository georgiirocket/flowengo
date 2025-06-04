import { type FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectsCtxStore } from "@common/providers/projects";
import Marker from "@common/components/marker";
import { IoIosSettings } from "react-icons/io";
import { Button } from "@heroui/button";
import { openEditProjectModal } from "@layouts/dashboard/components/modals/hooks/use-edit-project.ts";

const ProjectBase: FC = () => {
  const projectsData = useProjectsCtxStore((state) => state.projectsData);
  const params = useParams<{ id?: string }>();
  const project = projectsData.projects.find(
    (project) => project.id === params.id,
  );

  const handleEdit = useCallback(() => {
    if (!project) {
      return;
    }

    openEditProjectModal(project);
  }, [project]);

  if (!params.id || !project) {
    return <div />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={params.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-2 grid-cols-[auto_auto_1fr] items-center w-full overflow-hidden"
      >
        <Button isIconOnly size="sm" onPress={handleEdit}>
          <IoIosSettings size={20} />
        </Button>
        <Marker color={project.color} />
        <p className="uppercase text-ellipsis overflow-hidden text-nowrap">
          {project.title}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectBase;
