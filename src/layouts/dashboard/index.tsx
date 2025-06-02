import type { FC } from "react";
import useSWR from "swr";
import { getProtectedData } from "@common/actions/get-protected-data";
import { ProjectsProvider } from "@common/providers/projects";
import { Outlet, useParams } from "react-router-dom";
import { DashboardModalProvider } from "@common/providers/dashboard-modal";
import Footer from "./components/footer";
import { AnimatePresence, motion } from "framer-motion";

const DashboardLayout: FC = () => {
  const params = useParams<{ id?: string }>();

  const { data: result } = useSWR("protected", getProtectedData, {
    suspense: true,
  });

  if (result.error || !result.data) {
    throw new Error(result.error);
  }

  return (
    <DashboardModalProvider>
      <ProjectsProvider data={result.data}>
        <div className="size-full p-2 grid grid-rows-[1fr_auto] gap-2 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={params.id}
              className="size-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </ProjectsProvider>
    </DashboardModalProvider>
  );
};

export default DashboardLayout;
