import { type Client, Stronghold } from "@tauri-apps/plugin-stronghold";
import { appDataDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";

export type StrongholdDataRes = { error: string; db_key: string };

async function initStronghold(
  userName: string,
  password: string,
): Promise<{ stronghold: Stronghold; client: Client }> {
  const vaultPath = `${await appDataDir()}/vault.hold`;
  const stronghold = await Stronghold.load(vaultPath, password);

  let client: Client;

  try {
    client = await stronghold.loadClient(userName);
  } catch {
    client = await stronghold.createClient(userName);
  }

  return { stronghold, client };
}

export async function createDbKey(
  userName: string,
  password: string,
): Promise<StrongholdDataRes> {
  const result: StrongholdDataRes = { error: "", db_key: "" };

  try {
    const db_key = await invoke<string>("get_random_string");
    const { stronghold, client } = await initStronghold(userName, password);
    const store = client.getStore();

    await store.insert("db_key", Array.from(new TextEncoder().encode(db_key)));
    await stronghold.save();

    result.db_key = db_key;
  } catch (err) {
    const errorMessage = (err as Error).message;
    result.error = errorMessage;
  }

  return result;
}

export async function getDbKey(
  userName: string,
  password: string,
): Promise<StrongholdDataRes> {
  const result: StrongholdDataRes = { error: "", db_key: "" };

  try {
    const { client } = await initStronghold(userName, password);
    const store = client.getStore();

    const data = await store.get("db_key");

    if (data) {
      result.db_key = new TextDecoder().decode(new Uint8Array(data));
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    result.error = errorMessage;
  }

  return result;
}
