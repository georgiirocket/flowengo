import type { FallbackProps } from "react-error-boundary";
import type { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { emit } from "@tauri-apps/api/event";

export function FallbackRender({ error }: FallbackProps): ReactNode {
  return (
    <div className="w-dvw h-dvh grid place-items-center">
      <div className="flex flex-col gap-2">
        <Alert
          color="danger"
          title="Something went wrong"
          className="max-w-screen-sm"
          description={error.message ?? ""}
        />
        <Button
          size="sm"
          color="primary"
          onPress={() => {
            emit("quit-app").catch((e) => {
              console.error("Quit app: ", e);
            });
          }}
        >
          Force app
        </Button>
      </div>
    </div>
  );
}
