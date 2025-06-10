// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde_json::from_value;
use std::sync::Mutex;
use tauri::{Emitter, Listener, Manager};
use tauri_plugin_store::StoreExt;

mod commands;
mod constants;
mod crypto;
mod helpers;
mod model;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .manage(Mutex::new(model::AppState::new()))
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let drop_item_menu = tauri::menu::MenuItemBuilder::new("Drop user data")
                .id("drop-user-data")
                .build(app)?;

            let app_submenu = tauri::menu::SubmenuBuilder::new(app, "App")
                .about(Some(tauri::menu::AboutMetadata {
                    ..Default::default()
                }))
                .separator()
                .item(&drop_item_menu)
                .separator()
                .hide()
                .hide_others()
                .quit()
                .build()?;

            let edit_submenu = tauri::menu::SubmenuBuilder::new(app, "Edit")
                .undo()
                .redo()
                .separator()
                .cut()
                .copy()
                .paste()
                .select_all()
                .separator()
                .build()?;

            let view_submenu = tauri::menu::SubmenuBuilder::new(app, "View")
                .fullscreen()
                .build()?;

            let window_submenu = tauri::menu::SubmenuBuilder::new(app, "Window")
                .minimize()
                .maximize()
                .separator()
                .close_window()
                .build()?;

            let menu = tauri::menu::MenuBuilder::new(app)
                .items(&[
                    &app_submenu,
                    &edit_submenu,
                    &view_submenu,
                    &window_submenu,
                ])
                .build()?;

            app.set_menu(menu)?;

            app.on_menu_event(move |app, event| {
                if event.id() == drop_item_menu.id() {
                    // emit a window event to the frontend
                    let _event = app.emit("drop-data", "");
                }
            });


            {
                let app_handle = app.handle().clone();

                app.listen("quit-app", move |_event| {
                    app_handle.exit(0);
                });
            }

            // app.listen("quit-app", move |_event| {
            //     app_handle.exit(0);
            // });

            let common_store = app.store(constants::STORE_PATH_COMMON)?;

            if common_store.has("data") {
                let value = common_store
                    .get("data")
                    .expect("Failed to get common from store");
                let app_data: model::CommonStore =
                    from_value(value).expect("Failed to parse common store");

                let state = app.state::<Mutex<model::AppState>>();
                let mut state = state.lock().map_err(|e| e.to_string())?;

                state.is_initialized = app_data.is_initialized;
                state.user_name = app_data.user_name.clone();
                state.create_date = app_data.create_date.clone();
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_app_state,
            commands::sign_up,
            commands::sign_in,
            commands::drop_all_data,
            commands::get_random_string,
            commands::get_protected_data,
            commands::update_protected_data,
            commands::log_out,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}