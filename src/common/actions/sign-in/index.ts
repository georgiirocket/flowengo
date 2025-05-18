import { invoke } from "@tauri-apps/api/core";
import type { AppData } from "@common/actions/get-app-state";

type Data = { user_data: AppData; json_str: string };

export interface SignInResponse {
  error: string;
  data?: Data;
}

export const signIn = async (password: string): Promise<SignInResponse> => {
  const response: SignInResponse = { error: "" };

  try {
    const data = await invoke<Data>("sign_in", { password });

    response.data = data;
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
