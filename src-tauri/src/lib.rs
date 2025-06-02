// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde_json::{from_value};
use std::sync::Mutex;
use tauri::{Listener, Manager};
use tauri_plugin_store::StoreExt;

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
            let app_handle = app.handle().clone();

            app.listen("quit-app", move|_event| {
                app_handle.exit(0);
            });

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
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_app_state,
            commands::sign_up,
            commands::sign_in,
            commands::drop_all_data,
            commands::get_random_string,
            commands::get_protected_data,
            commands::update_protected_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
