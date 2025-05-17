import { invoke } from "@tauri-apps/api/core";

export interface AppData {
  is_initialized: boolean;
  user_name: string;
  create_date: string;
}

export const getAppState = async (): Promise<AppData> => {
  return invoke<AppData>("get_app_state", {});
};
