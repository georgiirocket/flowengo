"use client";

import { type StoreApi, useStore } from "zustand";
import {
  type Store,
  createDashboardModalStore,
} from "@common/stores/dashboard";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";

type TypeStore = Store;
const createStoreFn = createDashboardModalStore;

export interface IContext {
  store: StoreApi<TypeStore>;
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const Context = createContext<IContext>(undefined!);

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<TypeStore>>(undefined);

  if (!storeRef.current) {
    storeRef.current = createStoreFn();
  }

  return (
    <Context.Provider value={{ store: storeRef.current }}>
      {children}
    </Context.Provider>
  );
};

/**
 * Use context (store)
 */
const useContextStore = <T,>(selector: (state: TypeStore) => T): T => {
  const { store } = useContext(Context);

  return useStore(store as StoreApi<TypeStore>, selector);
};

export const DashboardModalProvider = Provider;
export const useDashboardModalCtxStore = useContextStore;
