import {
  Menu,
  MenuItem,
  Submenu,
  PredefinedMenuItem,
} from "@tauri-apps/api/menu";
import { emit } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";

const dropDataItem = await MenuItem.new({
  id: "drop-data",
  text: "Drop user data",
  action: () => {
    void emit(EVENTS.dropData);
  },
});

const quitItem = await MenuItem.new({
  id: "quit",
  text: "Quit Frowengo",
  action: () => {
    void emit(EVENTS.quitApp);
  },
});

const newProjectItem = await MenuItem.new({
  id: "new-project",
  text: "New project",
  action: () => {
    console.log("new project");
  },
});

export const fileSubmenu = await Submenu.new({
  id: "flowengo",
  text: "Flowengo",
  items: [
    dropDataItem,
    await PredefinedMenuItem.new({ item: "Separator" }),
    quitItem,
  ],
});

export const projectSubMenu = await Submenu.new({
  id: "file",
  text: "File",
  items: [newProjectItem],
});

await projectSubMenu.setEnabled(false);

export const menu = await Menu.new({
  items: [fileSubmenu, projectSubMenu],
});

await menu.setAsAppMenu();

export function enableProjectMenu(open: boolean) {
  projectSubMenu.setEnabled(open).catch((e) => {
    console.error("Enable project menu error:", e);
  });
}
