import type { FC } from "react";
import { twJoin } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  name: string;
  message?: string;
  className?: string;
}

const ErrorMessage: FC<Props> = ({ name, message, className }) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          key={name}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={twJoin("text-danger", className)}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
