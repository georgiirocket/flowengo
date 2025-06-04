import { type FC, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEditProjectCtxStore } from "@layouts/dashboard/components/modals/edit-project/provider";

const NewStep: FC = () => {
  const [value, setValue] = useState("");
  const createNewStep = useEditProjectCtxStore((state) => state.createNewStep);

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
