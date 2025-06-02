import type { DropdownMenuProps } from "@heroui/dropdown";
import { type Key, type ReactNode, useCallback, useMemo } from "react";

export interface IDropdownItem {
  key: string;
  label: string;
  onClick: () => void | Promise<void>;
  startContent?: ReactNode;
  isDisabled?: boolean;
  description?: string;
  color?: string;
}

/**
 * Use dropdown actions
 * @param items
 */
export const useDropdownAction = (
  items: IDropdownItem[],
): { onAction: DropdownMenuProps["onAction"]; disabledKeys: string[] } => {
  /**
   * On actions
   */
  const onAction = useCallback(
    (id: Key | null) => {
      if (!id) {
        return;
      }

      const currentItem = items.find((item) => id === item.key);

      if (!currentItem) {
        return;
      }

      void currentItem.onClick();
    },
    [items],
  );

  /**
   * Disabled keys
   */
  const disabledKeys = useMemo(() => {
    return items.filter(({ isDisabled }) => isDisabled).map(({ key }) => key);
  }, [items]);

  return { onAction, disabledKeys };
};
