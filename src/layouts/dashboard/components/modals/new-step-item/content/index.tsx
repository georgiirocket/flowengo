import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import Colors from "./components/colors";
import { useProjectsCtxStore } from "@common/providers/projects";
import { useNewStepItemCtxStore } from "../provider";

const Content: FC<{ close: () => void }> = ({ close }) => {
  const createNewStepItem = useProjectsCtxStore(
    (state) => state.createNewStepItem,
  );
  const getStoreResult = useNewStepItemCtxStore(
    (state) => state.getStoreResult,
  );

  const handleCreate = (): void => {
    const store = getStoreResult();
    createNewStepItem(store);

    close();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">New task</ModalHeader>
      <ModalBody className="gap-2">
        <Title />
        <Colors />
        <Description />
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
