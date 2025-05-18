// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde_json::{from_value};
use std::sync::Mutex;
use tauri::{Emitter, Manager};
use tauri_plugin_store::StoreExt;
use tauri::menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder};

mod model;
mod helpers;
mod constants;
mod crypto;
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(model::AppState::new()))
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let app_handle = app.handle();

            let quit_item = MenuItemBuilder::new("Quit Flowengo")
                .id("quit")
                .accelerator("CmdOrCtrl+Q")
                .build(app)?;

            let drop_item = MenuItemBuilder::new("Drop user data")
                .id("drop")
                .build(app)?;

            let file_submenu = SubmenuBuilder::new(app_handle,"File")
                .item(&quit_item)
                .separator()
                .item(&drop_item)
                .build()?;

            let menu = MenuBuilder::new(app)
                .items(&[&file_submenu])
                .build()?;

            app.set_menu(menu)?;

            let common_store = app.store(constants::STORE_PATH_COMMON)?;

            if common_store.has("data") {
                let value = common_store.get("data").expect("Failed to get common from store");
                let app_data: model::CommonStore = from_value(value).expect("Failed to parse common store");

                let state = app.state::<Mutex<model::AppState>>();
                let mut state = state.lock().map_err(|e| e.to_string())?;

                state.is_initialized = app_data.is_initialized;
                state.user_name = app_data.user_name.clone();
                state.create_date = app_data.create_date.clone();
            }

            Ok(())
        })
        .on_menu_event(|app, event| {
            match event.id().0.as_str() {
                "quit" => {
                    std::process::exit(0);
                }

                "drop" => {
                    app.emit("drop-data", 1).unwrap();
                }
                _ => {}
            }
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_app_state,
            commands::sign_up,
            commands::sign_in,
            commands::drop_all_data,
            commands::get_random_string
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
