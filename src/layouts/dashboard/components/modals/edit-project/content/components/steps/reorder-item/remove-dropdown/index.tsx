import type { FC, Key } from "react";
import type { IProjects } from "@common/stores/projects/types.ts";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";
import { IoIosTrash } from "react-icons/io";
import { Button } from "@heroui/button";
import { Dropdown, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Badge } from "@heroui/badge";
import { DropdownItem } from "@heroui/react";

const RemoveStepDropdown: FC<{
  step: IProjects["projects"][0]["steps"][0];
}> = ({ step }) => {
  const removeStep = useEditProjectCtxStore((state) => state.removeStep);

  const onAction = (k: Key): void => {
    if (k === step.id) {
      removeStep(step.id);
    }
  };

  return (
    <Dropdown size="sm">
      <DropdownTrigger>
        <div>
          <Badge as="button" size="sm" content={step.items.length}>
            <Button isDisabled color="danger" isIconOnly size="sm">
              <IoIosTrash size={20} />
            </Button>
          </Badge>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={onAction}
        aria-label="Static Actions"
        disallowEmptySelection
        className="max-w-[300px] max-h-[90vh] overflow-y-auto"
      >
        <DropdownItem
          color="danger"
          key={step.id}
          description="You have data into this step"
        >
          Remove
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default RemoveStepDropdown;
