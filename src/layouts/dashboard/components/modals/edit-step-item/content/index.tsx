import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import Colors from "./components/colors";
import { useProjectsCtxStore } from "@common/providers/projects";
import { useEditStepItemCtxStore } from "../provider";

const Content: FC<{ close: () => void }> = ({ close }) => {
  const editStepItem = useProjectsCtxStore((state) => state.editStepItem);
  const removeStepItem = useProjectsCtxStore((state) => state.removeStepItem);
  const getStoreResult = useEditStepItemCtxStore(
    (state) => state.getStoreResult,
  );

  const handleUpdate = (): void => {
    const store = getStoreResult();
    editStepItem(store);

    close();
  };

  const handleRemove = (): void => {
    const { projectId, stepId, item } = getStoreResult();
    removeStepItem({ projectId, stepId, itemId: item.id });

    close();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit task</ModalHeader>
      <ModalBody className="gap-2">
        <Title />
        <Colors />
        <Description />
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
          onPress={handleUpdate}
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
