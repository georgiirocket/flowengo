import type { FC } from "react";
import { useProjectsCtxStore } from "@common/providers/projects";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@common/constants/routes.ts";
import { getLocalProjectId } from "@common/helpers/save-local-project-id.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/button";
import ReactLogo from "@assets/icon-sq.svg?react";
import { openNewProjectModal } from "@layouts/dashboard/components/modals/hooks/use-new-project.ts";

const Dashboard: FC = () => {
  const projectsData = useProjectsCtxStore((state) => state.projectsData);
  const projectId = getLocalProjectId(projectsData);

  if (projectId) {
    return <Navigate to={`${ROUTES.dashboard}/${projectId}`} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="size-full grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Button
          color="primary"
          radius="full"
          onPress={() => openNewProjectModal()}
          startContent={<ReactLogo className="size-[20px]" />}
        >
          Create the first project
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Dashboard;
