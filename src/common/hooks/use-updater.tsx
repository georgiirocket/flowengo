import { useCallback, useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { addToast, closeAll } from "@heroui/react";
import { Button } from "@heroui/button";
import { listen } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";
import { updateNotificationKey, appName } from "@common/constants";

export const useUpdater = () => {
  const messageNotification = (flag: boolean): void => {
    addToast({
      title: appName,
      description: `Update notification is ${flag ? "enabled" : "disabled"}`,
      hideIcon: true,
    });
  };

  const updateNowFn = useCallback(async () => {
    try {
      const update = await check();

      if (!update) {
        return;
      }

      await update.downloadAndInstall();
      await relaunch();
    } catch (e) {
      console.error("Update error", e);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const checkUpdatesRunApp = useCallback(async (): Promise<void> => {
    try {
      const showUpdateMessage = window.localStorage.getItem(
        updateNotificationKey,
      );

      if (showUpdateMessage && showUpdateMessage === "false") {
        return;
      }

      const update = await check();

      if (update) {
        addToast({
          title: appName,
          description: (
            <p className="text-tiny">
              New version of the application is available
            </p>
          ),
          timeout: 10000,
          hideIcon: true,
          endContent: (
            <div className="grid gap-1">
              <Button
                size="sm"
                variant="bordered"
                onPress={() => {
                  window.localStorage.setItem(updateNotificationKey, "false");

                  closeAll();
                }}
              >
                Dont show
              </Button>
              <Button
                color="primary"
                size="sm"
                variant="bordered"
                onPress={updateNowFn}
              >
                Update now
              </Button>
            </div>
          ),
        });
      }
    } catch (e) {
      console.error("Check updates", e);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const checkUpdates = useCallback(async (): Promise<void> => {
    try {
      const update = await check();

      if (update) {
        addToast({
          title: appName,
          description: (
            <p className="text-tiny">
              New version of the application is available
            </p>
          ),
          timeout: 10000,
          hideIcon: true,
          endContent: (
            <div className="grid gap-1">
              <Button
                color="primary"
                size="sm"
                variant="bordered"
                onPress={updateNowFn}
              >
                Update now
              </Button>
            </div>
          ),
        });
      }
    } catch (e) {
      console.error("Check updates", e);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    void checkUpdatesRunApp();

    const unlisten = listen(EVENTS.checkForUpdates, () => {
      void checkUpdates();
    });

    const unlistenNotification = listen(EVENTS.updateNotification, () => {
      const showUpdateMessage = window.localStorage.getItem(
        updateNotificationKey,
      );

      if (!showUpdateMessage || showUpdateMessage === "true") {
        window.localStorage.setItem(updateNotificationKey, "false");
        messageNotification(false);

        return;
      }

      window.localStorage.setItem(updateNotificationKey, "true");
      messageNotification(true);
    });

    return () => {
      unlisten.then((fn) => fn());
      unlistenNotification.then((fn) => fn());
    };
  }, []);
};
