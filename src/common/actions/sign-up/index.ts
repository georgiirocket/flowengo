import { invoke } from "@tauri-apps/api/core";
import type { AppData } from "@common/actions/get-app-state";

type Data = { user_data: AppData };

interface SignUpRequest {
  username: string;
  password: string;
}

export interface CreateAccountResponse {
  error: string;
  data?: Data;
}

export const signUp = async (
  input: SignUpRequest,
): Promise<CreateAccountResponse> => {
  const response: CreateAccountResponse = { error: "" };

  try {
    const data = await invoke<Data>("sign_up", {
      name: input.username,
      password: input.password,
    });

    response.data = data;
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
