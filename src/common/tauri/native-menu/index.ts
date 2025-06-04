import {
  Menu,
  MenuItem,
  Submenu,
  PredefinedMenuItem,
} from "@tauri-apps/api/menu";
import { emit } from "@tauri-apps/api/event";
import { EVENTS } from "@common/events";
import { openRemoveDataModal } from "@common/hooks/use-drop-data-modal.ts";

class AppMenu {
  commonSeparator: PredefinedMenuItem | null = null;
  dropDataItem: MenuItem | null = null;
  quitItem: MenuItem | null = null;
  newProjectItem: MenuItem | null = null;
  fileSubmenu: Submenu | null = null;
  projectSubMenu: Submenu | null = null;
  menu: Menu | null = null;

  /**
   * Init menu
   */
  public async init() {
    try {
      const [commonSeparator, dropDataItem, quitItem, newProjectItem] =
        await Promise.all([
          PredefinedMenuItem.new({ item: "Separator" }),
          MenuItem.new({
            id: "drop-data",
            text: "Drop user data",
            action: openRemoveDataModal,
          }),
          MenuItem.new({
            id: "quit",
            text: "Quit Frowengo",
            action: () => {
              void emit(EVENTS.quitApp);
            },
          }),
          MenuItem.new({
            id: "new-project",
            text: "New project",
            action: () => {
              console.log("new project");
            },
          }),
        ]);

      const fileSubmenu = await Submenu.new({
        id: "flowengo",
        text: "Flowengo",
        items: [dropDataItem, commonSeparator, quitItem],
      });

      const projectSubMenu = await Submenu.new({
        id: "file",
        text: "File",
        items: [newProjectItem],
      });

      await projectSubMenu.setEnabled(false);

      const menu = await Menu.new({
        items: [fileSubmenu, projectSubMenu],
      });

      await menu.setAsAppMenu();

      this.commonSeparator = commonSeparator;
      this.dropDataItem = dropDataItem;
      this.quitItem = quitItem;
      this.newProjectItem = newProjectItem;

      this.fileSubmenu = fileSubmenu;
      this.projectSubMenu = projectSubMenu;

      this.menu = menu;
    } catch (e) {
      console.error("Set app menu", e);
    }
  }

  /**
   * Enable project menu
   * @param open
   */
  public enableProjectMenu(open: boolean) {
    if (this.projectSubMenu) {
      this.projectSubMenu.setEnabled(open).catch((e) => {
        console.error("Enable project menu error:", e);
      });
    }
  }
}

export const menu = new AppMenu();
