import { invoke } from "@tauri-apps/api/core";

export interface UpdateProtectedData {
  error: string;
}

export const updateProtectedData = async (
  jsonStr: string,
): Promise<UpdateProtectedData> => {
  const response: UpdateProtectedData = { error: "" };

  try {
    await invoke("update_protected_data", { jsonStr });
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
