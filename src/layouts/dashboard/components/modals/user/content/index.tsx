import type { FC } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";

const Content: FC = () => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Account</ModalHeader>
      <ModalBody>
        <p>DNj</p>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" color="danger" variant="bordered">
          Remove account
        </Button>
        <Button size="sm">Log out</Button>
      </ModalFooter>
    </>
  );
};

export default Content;
