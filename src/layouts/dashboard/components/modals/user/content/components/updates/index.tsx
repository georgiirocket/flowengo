import { type FC, useEffect, useState, useTransition } from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { getVersion } from "@tauri-apps/api/app";
import { motion, AnimatePresence } from "framer-motion";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { addToast } from "@heroui/react";

const Updates: FC = () => {
  const [version, setVersion] = useState("");
  const [isExistUpdates, setExistUpdates] = useState(false);
  const [isPending, setPending] = useTransition();

  const updateFn = (): void => {
    // @ts-ignore
    setPending(async () => {
      try {
        const update = await check();

        if (!update) {
          return;
        }

        await update.downloadAndInstall();
        await relaunch();
      } catch (e) {
        addToast({
          title: "Flowengo",
          description: "Installation of updates failed",
          hideIcon: true,
        });
        console.error("Update app error: ", e);
      }
    });
  };

  useEffect(() => {
    getVersion()
      .then((v) => setVersion(v))
      .catch((e) => {
        console.error("Get app version", e);
      });

    check()
      .then((update) => {
        if (update) {
          setExistUpdates(true);
        }
      })
      .catch((e) => {
        console.error("Check updates", e);
      });
  }, []);

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1>App version:</h1>
        <p className="text-tiny">{version}</p>
      </div>
      <AnimatePresence>
        {isExistUpdates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              hideIcon
              title="New version of the application is available"
              variant={"bordered"}
              endContent={
                <div className="m-auto grid gap-2">
                  <Button
                    isLoading={isPending}
                    color="primary"
                    variant="bordered"
                    size="sm"
                    onPress={updateFn}
                  >
                    Update now
                  </Button>
                </div>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Updates;
