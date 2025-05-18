import { invoke } from "@tauri-apps/api/core";

export interface DropDataResponse {
  error: string;
}

export const dropAllData = async (): Promise<DropDataResponse> => {
  const response: DropDataResponse = { error: "" };

  try {
    await invoke<string>("drop_all_data");
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
