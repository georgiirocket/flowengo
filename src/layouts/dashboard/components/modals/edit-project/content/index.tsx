import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import NewStep from "./components/new-step";
import Steps from "./components/steps";
import Colors from "./components/colors";
import { useProjectsCtxStore } from "@common/providers/projects";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@common/constants/routes.ts";

const Content: FC<{ close: () => void }> = ({ close }) => {
  const navigate = useNavigate();

  const updateProject = useProjectsCtxStore((state) => state.updateProject);
  const removeProject = useProjectsCtxStore((state) => state.removeProject);

  const getProject = useEditProjectCtxStore((state) => state.getProject);

  const handleCreate = (): void => {
    const editProject = getProject();
    updateProject(editProject);

    close();
  };

  const handleRemove = (): void => {
    const editProject = getProject();

    removeProject(editProject.id);
    navigate(ROUTES.dashboard);

    close();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit project</ModalHeader>
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
          color="danger"
          variant="bordered"
          onPress={handleRemove}
        >
          Remove
        </Button>
        <Button
          size="sm"
          color="primary"
          variant="bordered"
          onPress={handleCreate}
        >
          Update
        </Button>
        <Button size="sm" onPress={close}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
};

export default Content;
