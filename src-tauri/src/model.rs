use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AppState {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
    pub db_key: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct StoreState {
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