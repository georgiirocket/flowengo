import type { FC } from "react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import ReactLogo from "@assets/icon-sq.svg?react";
import { Divider } from "@heroui/divider";

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
        <CardBody className="w-full grid grid-cols-[auto_auto_1fr_auto_auto] gap-2 items-center overflow-hidden">
          <ReactLogo className="size-[20px]" />
          <Divider orientation="vertical" />
          <div>Full</div>
          <Divider orientation="vertical" />
          <div>Settings</div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Footer;
