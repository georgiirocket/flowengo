import type { FC } from "react";
import { Card, CardBody } from "@heroui/card";

const Empty: FC = () => {
  return (
    <Card className="size-full">
      <CardBody className="size-full overflow-hidden" />
    </Card>
  );
};

export default Empty;
