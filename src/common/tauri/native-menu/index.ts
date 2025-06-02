import {
  Menu,
  MenuItem,
  Submenu,
  PredefinedMenuItem,
} from "@tauri-apps/api/menu";
import { emit } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

export const dropDataItem = await MenuItem.new({
  id: "drop-data",
  text: "Drop user data",
  action: () => {
    void emit(EVENTS.dropData);
  },
});

export const quitItem = await MenuItem.new({
  id: "quit",
  text: "Quit Frowengo",
  action: () => {
    void emit(EVENTS.quitApp);
  },
});

export const fileSubmenu = await Submenu.new({
  text: "File",
  items: [
    dropDataItem,
    await PredefinedMenuItem.new({ item: "Separator" }),
    quitItem,
  ],
});

export const menu = await Menu.new({
  items: [fileSubmenu],
});

await menu.setAsAppMenu();
