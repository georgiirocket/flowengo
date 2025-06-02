import type { FC } from "react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import Settings from "./settings";
import ProjectsButton from "./buttons/projects";
import ProjectBase from "./base";
import NewProjectButton from "./buttons/new";

const Footer: FC = () => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: "100%" }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardBody className="w-full grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-2 items-center overflow-hidden">
          <NewProjectButton />
          <Divider orientation="vertical" />
          <ProjectBase />
          <Divider orientation="vertical" />
          <ProjectsButton />
          <Settings />
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Footer;
