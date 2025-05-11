import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStore {
  is_initialized: boolean;
  user_name: string;
  create_date: string;
  db_key: string;
}

type SetAppDataProps = Pick<
  AppStore,
  "is_initialized" | "user_name" | "create_date"
>;

export interface Store extends AppStore {
  getIsAuthenticated(): boolean;
  setAppData(data: SetAppDataProps): void;
  setDbKey(key: string): void;
  removeDbKey(): void;
  clear(): void;
}

export const createAppStore = () => {
  return create<Store>()(
    immer((set, get) => ({
      is_initialized: false,
      user_name: "",
      create_date: "",
      db_key: "",

      /**
       * Get is auth
       */
      getIsAuthenticated: () => {
        return get().db_key !== "";
      },

      /**
       * Set app data
       * @param data
       */
      setAppData: (data) => {
        set((state) => {
          state.is_initialized = data.is_initialized;
          state.user_name = data.user_name;
          state.create_date = data.create_date;
        });
      },

      /**
       * Set db key
       * @param key
       */
      setDbKey: (key) => {
        set((state) => {
          state.db_key = key;
        });
      },

      /**
       * Clear store
       */
      clear: () => {
        set((state) => {
          state.is_initialized = false;
          state.user_name = "";
          state.create_date = "";
          state.db_key = "";
        });
      },

      /**
       * Remove db key
       */
      removeDbKey: () => {
        set((state) => {
          state.db_key = "";
        });
      },
    })),
  );
};
