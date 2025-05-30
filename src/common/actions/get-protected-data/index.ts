import { invoke } from "@tauri-apps/api/core";
import type { OutputBackend } from "@common/interfaces/input-backend";

export interface ProtectedData {
  error: string;
  data?: OutputBackend;
}

export const getProtectedData = async (): Promise<ProtectedData> => {
  const response: ProtectedData = { error: "" };

  try {
    const data = await invoke<{ json_str: string }>("get_protected_data");

    response.data = JSON.parse(data.json_str);
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
