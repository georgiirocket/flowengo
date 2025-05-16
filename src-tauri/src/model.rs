use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AppState {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
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

impl AppState {
    pub fn new() -> Self {
        Self {
            is_initialized: false,
            user_name: "".to_string(),
            create_date: "".to_string(),
        }
    }
}

impl UserData {
    pub fn new(is_initialized: bool, user_name: String, create_date: String) -> Self {
        Self {
            is_initialized,
            user_name,
            create_date,
        }
    }
}