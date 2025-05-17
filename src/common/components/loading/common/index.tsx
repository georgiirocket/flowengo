import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactLogo from "@assets/icon-sq.svg?react";
import { appName } from "@common/constants";

const CommonLoading: FC = () => {
  return (
    <AnimatePresence>
      <div className="w-dvw h-dvh grid place-items-center">
        <div className="flex gap-2 items-center">
          <motion.div
            className="size-[40px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ReactLogo className="w-full h-full" />
          </motion.div>
          <motion.p
            className="text-2xl overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 101 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {appName}
          </motion.p>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CommonLoading;
