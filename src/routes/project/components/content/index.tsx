import type { FC } from "react";
import type { IProjects } from "@common/stores/projects/types.ts";
import { Card, CardBody } from "@heroui/card";
import Header from "./components/header";

interface Props {
  project: IProjects["projects"][0];
}

const Content: FC<Props> = ({ project }) => {
  const { id, steps } = project;

  return (
    <div className="w-[calc(100dvw-1rem)] h-full !overflow-auto">
      <div
        className="grid gap-2 min-w-full h-full py-2 px-1"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, 270px)`,
        }}
      >
        {steps.map((s) => (
          <Card key={s.id} shadow="sm">
            <Header projectId={id} stepId={s.id} title={s.title} />
            <CardBody>Body</CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Content;
