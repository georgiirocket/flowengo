import { type FC, useState } from "react";
import { useNewProjectCtxStore } from "@layouts/dashboard/components/modals/new-project/provider";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IoIosAddCircleOutline } from "react-icons/io";

const NewStep: FC = () => {
  const [value, setValue] = useState("");
  const createNewStep = useNewProjectCtxStore((state) => state.createNewStep);

  const handleAddStep = (): void => {
    createNewStep(value.length ? value : "New step");
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        size="sm"
        label="New step"
        type="text"
        placeholder="Enter step name"
        value={value}
        onValueChange={setValue}
        endContent={
          <Button color="primary" isIconOnly size="sm" onPress={handleAddStep}>
            <IoIosAddCircleOutline size={20} />
          </Button>
        }
      />
    </div>
  );
};

export default NewStep;
