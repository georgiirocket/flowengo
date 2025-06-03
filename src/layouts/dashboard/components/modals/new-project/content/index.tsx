import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Title from "./components/title";
import Description from "./components/description";
import NewStep from "./components/new-step";
import Steps from "./components/steps";
import Colors from "./components/colors";

const Content: FC<{ close: () => void }> = ({ close }) => {
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
        <Button size="sm" color="primary" variant="bordered">
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
