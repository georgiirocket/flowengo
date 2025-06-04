import type { FC } from "react";
import { CardHeader } from "@heroui/card";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Chip } from "@heroui/react";

interface Props {
  projectId: string;
  stepId: string;
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <CardHeader className="w-full flex gap-1 pb-0 items-start overflow-hidden">
      <span className="w-full uppercase text-ellipsis overflow-hidden text-nowrap">
        {title}
      </span>
      <Chip
        radius="sm"
        size="sm"
        classNames={{ base: "!w-full cursor-pointer", content: "!w-full" }}
        startContent={<IoIosAddCircleOutline size={10} />}
      >
        Add More
      </Chip>
    </CardHeader>
  );
};

export default Header;
