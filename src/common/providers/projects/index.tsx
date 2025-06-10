"use client";

import { type StoreApi, useStore } from "zustand";
import { type Store, createProjectsStore } from "@common/stores/projects";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import debounce from "lodash/debounce";
import { updateProtectedData } from "@common/actions/update-protected-data";
import { addToast } from "@heroui/react";

type TypeStore = Store;
const createStoreFn = createProjectsStore;

export interface IContext {
  store: StoreApi<TypeStore>;
}

type InitProps = { data: Parameters<typeof createStoreFn>[0] };

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const Context = createContext<IContext>(undefined!);

const Provider: FC<PropsWithChildren<InitProps>> = ({ children, data }) => {
  const storeRef = useRef<StoreApi<TypeStore>>(undefined);

  if (!storeRef.current) {
    storeRef.current = createStoreFn(data);
  }

  const debounceFn = useCallback(
    debounce(async (data: Store["projectsData"]) => {
      try {
        const { error } = await updateProtectedData(JSON.stringify(data));

        if (error) {
          console.error("Save backend data", error);
        }
      } catch (e) {
        addToast({ title: "Request failed", color: "danger" });

        console.error("Save backend data", e);
      }
    }, 1000),
    [],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const unSubscribe = storeRef.current?.subscribe((newStore, oldStore) => {
      if (oldStore.projectsData.version !== newStore.projectsData.version) {
        debounceFn(newStore.projectsData);
      }
    });

    return () => {
      unSubscribe?.();
    };
  }, []);

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

export const ProjectsProvider = Provider;
export const useProjectsCtxStore = useContextStore;
