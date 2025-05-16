use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AppState {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
    db_key: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CommonStore {
    pub is_initialized: bool,
    pub user_name: String,
    pub create_date: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProtectedStore {
    secure_field: String,
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
            db_key: "".to_string(),
        }
    }

    //Fill state with user data
    pub fn fill_state(&mut self, user_data: &UserData) {
        self.user_name = user_data.user_name.clone();
        self.is_initialized = user_data.is_initialized;
        self.create_date = user_data.create_date.clone();
    }

    // pub fn get_db_key(&self) -> String {
    //     self.db_key.clone()
    // }

    pub fn set_db_key(&mut self, db_key: String) {
        self.db_key = db_key;
    }

    pub fn drop_state(&mut self) {
        self.user_name = "".to_string();
        self.is_initialized = false;
        self.create_date = "".to_string();
        self.db_key = "".to_string();
    }
}

impl CommonStore {
    pub fn new(user_data: &UserData) -> Self {
        Self {
            is_initialized: user_data.is_initialized,
            user_name: user_data.user_name.clone(),
            create_date: user_data.create_date.clone(),
        }
    }
}

impl ProtectedStore {
    pub fn new()  -> Self {
        Self {
            secure_field: "".to_string(),
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