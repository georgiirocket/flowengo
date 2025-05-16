// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use chrono::Utc;
use serde_json::{from_value, json};
use std::sync::Mutex;
use tauri::{AppHandle, Manager};
use tauri_plugin_store::StoreExt;

mod model;
mod constants;
mod helpers;

//Get settings app
#[tauri::command]
async fn get_app_settings(app_handle: AppHandle) -> Result<model::UserData, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();

    let state = state.lock().map_err(|e| e.to_string())?;

    Ok(model::UserData::new(state.is_initialized, state.user_name.clone(), state.create_date.clone()))
}

//Create user
#[tauri::command]
async fn create_app_settings(app_handle: AppHandle, name: String, db_key: String) -> Result<model::UserData, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    let common_store = app_handle.store(constants::STORE_PATH_COMMON).map_err(|e| e.to_string())?;
    let new_user_data = model::UserData::new(true, name, Utc::now().to_rfc3339());

    state.fill_state(&new_user_data);
    state.set_db_key(db_key);

    common_store.set("data", json!(model::CommonStore::new(&new_user_data)));

    Ok(new_user_data)
}

//Set db key
#[tauri::command]
async fn set_db_key(app_handle: AppHandle, key: String) -> Result<String, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    state.set_db_key(key);

    Ok("The key has been added".to_string())
}

//Drop all data
#[tauri::command]
async fn drop_all_data(app_handle: AppHandle) -> Result<String, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    let common_store = app_handle.store(constants::STORE_PATH_COMMON).map_err(|e| e.to_string())?;
    let protected_store = app_handle.store(constants::STORE_PATH_PROTECTED).map_err(|e| e.to_string())?;

    common_store.clear();
    protected_store.clear();

    state.drop_state();

    Ok("The full user data was dropped".to_string())
}

//Generate random string
#[tauri::command]
fn get_random_string() -> String {
    helpers::random_string(20)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_stronghold::Builder::with_argon2(constants::SALT.as_ref()).build())
        .manage(Mutex::new(model::AppState::new()))
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let common_store = app.store(constants::STORE_PATH_COMMON)?;
            let protected_store = app.store(constants::STORE_PATH_PROTECTED)?;

            protected_store.clear();

            if !protected_store.has("data") {
                protected_store.set("data", json!(model::ProtectedStore::new()));
            }

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
        .invoke_handler(tauri::generate_handler![get_app_settings, create_app_settings, get_random_string])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
