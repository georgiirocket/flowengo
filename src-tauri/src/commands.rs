use chrono::Utc;
use serde_json::{from_value, json};
use std::sync::Mutex;
use tauri::{AppHandle, Manager};
use tauri_plugin_store::StoreExt;

use crate:: model;
use crate::crypto;
use crate::helpers;
use crate::constants;

//Get state app
#[tauri::command]
pub async fn get_app_state(app_handle: AppHandle) -> Result<model::UserData, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();

    let state = state.lock().map_err(|e| e.to_string())?;

    Ok(model::UserData::new(state.is_initialized, state.user_name.clone(), state.create_date.clone()))
}

//Sign up
#[tauri::command]
pub async fn sign_up(app_handle: AppHandle, name: String, password: String) -> Result<model::SignUpResponse, String> {
    let common_store = app_handle.store(constants::STORE_PATH_COMMON).map_err(|e| e.to_string())?;
    let protected_store = app_handle.store(constants::STORE_PATH_PROTECTED).map_err(|e| e.to_string())?;

    let secure = crypto::SecureData::encrypt(&password, "{}".to_string()).await.map_err(|_e| "Failed to encrypt password")?;
    let user_data = model::UserData::new(true, name, Utc::now().to_rfc3339());

    common_store.set("data", json!(model::CommonStore::new(&user_data)));
    protected_store.set("data", json!(secure));

    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    state.fill_state(&user_data);
    state.set_password(password);

    Ok(model::SignUpResponse {user_data})
}

//Sign in
#[tauri::command]
pub async fn sign_in(app_handle: AppHandle, password: String) -> Result<model::SignInResponse, String> {
    let protected_store = app_handle.store(constants::STORE_PATH_PROTECTED).map_err(|e| e.to_string())?;

    let value = protected_store.get("data").ok_or("Protected store is empty")?;

    let secure: crypto::SecureData = from_value(value).map_err(|_e| "Failed to parse protected store")?;
    crypto::SecureData::decrypt(&password, secure.get_salt(), secure.get_nonce(), secure.get_secure_field()).map_err(|_e| "Incorrect password")?;

    let state = app_handle.state::<Mutex<model::AppState>>();
    let mut state = state.lock().map_err(|e| e.to_string())?;

    state.set_password(password);

    let user_data = model::UserData::new(state.is_initialized, state.user_name.clone(), state.create_date.clone());

    Ok(model::SignInResponse {user_data})
}

//Get protected data
#[tauri::command]
pub async fn get_protected_data(app_handle: AppHandle) -> Result<model::ProtectedDataResponse, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let password = {
        let state = state.lock().map_err(|e| e.to_string())?;
        state.get_password()
    };

    if password.len() == 0 {
        return Err("User is not signed in".to_string());
    }

    let protected_store = app_handle.store(constants::STORE_PATH_PROTECTED).map_err(|e| e.to_string())?;

    let value = protected_store.get("data").ok_or("Protected store is empty")?;

    let secure: crypto::SecureData = from_value(value).map_err(|_e| "Failed to parse protected store")?;
    let json_str = crypto::SecureData::decrypt(&password, secure.get_salt(), secure.get_nonce(), secure.get_secure_field()).map_err(|_e| "Incorrect password")?;

    Ok(model::ProtectedDataResponse {json_str})
}

//Update protected data
#[tauri::command]
pub async fn update_protected_data(app_handle: AppHandle, json_str: String) -> Result<model::UpdateProtectedDataResponse, String> {
    let state = app_handle.state::<Mutex<model::AppState>>();
    let password = {
        let state = state.lock().map_err(|e| e.to_string())?;
        state.get_password()
    };

    if password.len() == 0 {
        return Err("User is not signed in".to_string());
    }
    
    let protected_store = app_handle.store(constants::STORE_PATH_PROTECTED).map_err(|e| e.to_string())?;
    let secure = crypto::SecureData::encrypt(&password, json_str).await.map_err(|_e| "Failed to encrypt data")?;

    protected_store.set("data", json!(secure));

    Ok(model::UpdateProtectedDataResponse {is_updated: true})
}

//Drop all data
#[tauri::command]
pub async fn drop_all_data(app_handle: AppHandle) -> Result<String, String> {
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
pub fn get_random_string() -> String {
    helpers::random_string(20)
}