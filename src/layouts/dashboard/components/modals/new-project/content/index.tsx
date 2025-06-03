import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import NewStep from "./components/new-step";
import Steps from "./components/steps";
import Colors from "./components/colors";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { useProjectsCtxStore } from "@common/providers/projects";
import { useNavigate } from "react-router-dom";
import { saveLocalProjectId } from "@common/helpers/save-local-project-id.ts";
import { ROUTES } from "@common/constants/routes.ts";

const Content: FC<{ close: () => void }> = ({ close }) => {
  const navigate = useNavigate();
  const addNewProject = useProjectsCtxStore((state) => state.addNewProject);
  const getProject = useNewProjectCtxStore((state) => state.getProject);

  const handleCreate = (): void => {
    const project = getProject();
    addNewProject(project);

    saveLocalProjectId(project.id);
    navigate(`${ROUTES.dashboard}/${project.id}`);
    close();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">New project</ModalHeader>
      <ModalBody className="gap-2">
        <Title />
        <Description />
        <Colors />
        <NewStep />
        <Steps />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          color="primary"
          variant="bordered"
          onPress={handleCreate}
        >
          Create
        </Button>
        <Button size="sm" onPress={close}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
};

export default Content;
