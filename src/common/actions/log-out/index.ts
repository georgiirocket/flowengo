import { invoke } from "@tauri-apps/api/core";

export interface LogOutResponse {
  error: string;
}

export const logOut = async (): Promise<LogOutResponse> => {
  const response: LogOutResponse = { error: "" };

  try {
    await invoke("log_out");
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
