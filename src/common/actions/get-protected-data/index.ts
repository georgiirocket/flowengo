import { invoke } from "@tauri-apps/api/core";

export interface ProtectedData<TResult> {
  error: string;
  data?: TResult;
}

export const getProtectedData = async <TResult>(): Promise<
  ProtectedData<TResult>
> => {
  const response: ProtectedData<TResult> = { error: "" };

  try {
    const data = await invoke<{ json_str: string }>("get_protected_data");

    response.data = JSON.parse(data.json_str) as TResult;
  } catch (e) {
    response.error = e as string;
  }

  return response;
};
