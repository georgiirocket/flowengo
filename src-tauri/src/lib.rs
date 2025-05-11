// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use chrono::Utc;
use serde_json::{from_value, json};
use std::sync::Mutex;
use tauri::{AppHandle, Manager};
use tauri_plugin_store::StoreExt;

mod model;
mod constants;

//Get settings app
#[tauri::command]
async fn get_app_settings(app_handle: AppHandle) -> Result<model::UserData, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();

    let state = state.lock().map_err(|e| e.to_string())?;

    Ok(model::UserData {
        is_initialized: state.is_initialized,
        user_name: state.user_name.clone(),
        create_date: state.create_date.clone(),
    })
}

//Create user
#[tauri::command]
async fn create_app_settings(app_handle: AppHandle, name: String) -> Result<model::UserData, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    let store = app_handle
        .store(constants::SETTINGS_DB_NAME)
        .map_err(|e| e.to_string())?;

    let new_user_data = model::UserData {
        is_initialized: true,
        user_name: name,
        create_date: Utc::now().to_rfc3339(),
    };

    store.set(constants::SETTINGS_NAME_KEY, json!(new_user_data));

    state.user_name = new_user_data.user_name.clone();
    state.create_date = new_user_data.create_date.clone();
    state.is_initialized = new_user_data.is_initialized;

    Ok(new_user_data)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let settings = model::AppState {
        is_initialized: false,
        user_name: "".into(),
        create_date: "".into(),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_stronghold::Builder::with_argon2(constants::SALT.as_ref()).build())
        .manage(Mutex::new(settings))
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let store = app.store(constants::SETTINGS_DB_NAME)?;

            if store.has(constants::SETTINGS_NAME_KEY) {
                let value = store
                    .get(constants::SETTINGS_NAME_KEY)
                    .expect("Failed to get settings from store");

                let app_data: model::StoreState = from_value(value).expect("Failed to parse settings");

                let state = app.state::<Mutex<model::AppState>>();
                let mut state = state.lock().map_err(|e| e.to_string())?;

                state.is_initialized = app_data.is_initialized;
                state.user_name = app_data.user_name.clone();
                state.create_date = app_data.create_date.clone();
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_app_settings, create_app_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
