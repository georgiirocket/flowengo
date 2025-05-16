import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStore {
  is_initialized: boolean;
  user_name: string;
  create_date: string;
}

export interface Store extends AppStore {
  setAppData(data: AppStore): void;
  clear(): void;
}

export const createAppStore = () => {
  return create<Store>()(
    immer((set) => ({
      is_initialized: false,
      user_name: "",
      create_date: "",

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

      clear: () => {
        set((state) => {
          state.is_initialized = false;
          state.user_name = "";
          state.create_date = "";
        });
      },
    })),
  );
};
