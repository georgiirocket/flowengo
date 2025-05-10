// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use chrono::Utc;
use std::sync::Mutex;
use serde_json::{from_value, json};
use tauri_plugin_store::{StoreExt};
use tauri::{AppHandle, Manager};
use serde::{Serialize, Deserialize};

static SETTINGS_DB_NAME: &str = "settings.json";
static SETTINGS_NAME_KEY: &str = "settings";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AppState {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserData {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
}

//Get settings app
#[tauri::command]
async  fn get_app_settings(app_handle: AppHandle) -> Result<UserData, String> {
    let state = app_handle.state::<Mutex<AppState>>();

    let state = state.lock().map_err(|e| e.to_string())?;

    Ok(UserData {
        is_initialized: state.is_initialized,
        user_name: state.user_name.clone(),
        create_date: state.create_date.clone()
    })
}

//Create user
#[tauri::command]
async fn create_user(app_handle: AppHandle, name: String) -> Result<UserData, String> {
    let state = app_handle.state::<Mutex<AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    let store = app_handle.store(SETTINGS_DB_NAME).map_err(|e| e.to_string())?;

    let new_user_data = UserData {
        is_initialized: true,
        user_name: name,
        create_date: Utc::now().to_rfc3339(),
    };

    store.set(SETTINGS_NAME_KEY, json!(new_user_data));

    state.user_name = new_user_data.user_name.clone();
    state.create_date = new_user_data.create_date.clone();
    state.is_initialized = new_user_data.is_initialized;

    Ok(new_user_data)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let settings = AppState {
        is_initialized: false,
        user_name: "".into(),
        create_date: "".into(),
    };

    tauri::Builder::default()
        .manage(Mutex::new(settings))
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let store = app.store(SETTINGS_DB_NAME)?;

            if store.has(SETTINGS_NAME_KEY) {
                let value = store.get(SETTINGS_NAME_KEY).expect("Failed to get settings from store");
                let app_data: AppState = from_value(value).expect("Failed to parse settings");

                let state = app.state::<Mutex<AppState>>();
                let mut state = state.lock().map_err(|e| e.to_string())?;

                state.is_initialized = app_data.is_initialized;
                state.user_name = app_data.user_name.clone();
                state.create_date = app_data.create_date.clone();
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_app_settings, create_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
