import type { FC } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectsCtxStore } from "@common/providers/projects";
import Empty from "./components/empty";
import Content from "./components/content";

const Project: FC = () => {
  const params = useParams<{ id: string }>();
  const projects = useProjectsCtxStore((state) => state.projectsData.projects);

  const project = projects.find((p) => p.id === params.id);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={params.id}
        className="w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {project ? <Content project={project} /> : <Empty />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Project;
