import type { FC } from "react";
import { twJoin } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  message?: string;
  className?: string;
}

const FieldFormError: FC<Props> = ({ message, className }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className={twJoin("text-danger text-tiny", className)}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default FieldFormError;
