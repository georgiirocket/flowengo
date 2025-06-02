import type { FC } from "react";
import { Card, CardBody } from "@heroui/card";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Project: FC = () => {
  const params = useParams<{ id: string }>();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={params.id}
        className="size-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Card className="size-full">
          <CardBody className="size-full overflow-hidden">
            <h1>Project</h1>
            <p>{params.id}</p>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Project;
