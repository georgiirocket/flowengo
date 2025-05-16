use chacha20poly1305::{ChaCha20Poly1305, KeyInit, Key, Nonce};
use chacha20poly1305::aead::{Aead};
use argon2::{Argon2, PasswordHasher};
use argon2::password_hash::{SaltString};
use base64::{engine::general_purpose, Engine as _};
use rand::RngCore;
use rand_core::OsRng;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SecureData {
    json_str: String,
    nonce: String,
    salt: String
}

impl SecureData {
    pub fn get_secure_field(&self) -> String {
        self.json_str.clone()
    }

    pub async fn encrypt(password: &String, plaintext: String) -> Result<Self, String> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();

        let password_hash = argon2.hash_password(password.as_bytes(), &salt).map_err(|e| e.to_string())?;

        let derived_key = password_hash.hash.ok_or("No hash output")?;
        let key_bytes = derived_key.as_bytes();

        let key = Key::from_slice(&key_bytes[..32]); // ChaCha20 key = 32 bytes
        let cipher = ChaCha20Poly1305::new(key);

        // Generate random nonce
        let mut nonce_bytes = [0u8; 12];
        rand::thread_rng().fill_bytes(&mut nonce_bytes);
        let nonce = Nonce::from_slice(&nonce_bytes);

        // Encrypt
        let ciphertext = cipher.encrypt(nonce, plaintext.as_bytes())
            .map_err(|e| e.to_string())?;

        Ok(Self {
            json_str: general_purpose::STANDARD.encode(&ciphertext),
            nonce: general_purpose::STANDARD.encode(&nonce_bytes),
            salt: salt.to_string()
        })
    }

    pub fn decrypt(password: String, salt: String, nonce: String, plaintext: String) -> Result<String, String> {
        let salt = SaltString::from_b64(&salt).map_err(|e| e.to_string())?;
        let argon2 = Argon2::default();

        // Derive key again
        let password_hash = argon2.hash_password(password.as_bytes(), &salt)
            .map_err(|e| e.to_string())?;
        let derived_key = password_hash.hash.ok_or("No hash output")?;
        let key_bytes = derived_key.as_bytes();

        let key = Key::from_slice(&key_bytes[..32]);
        let cipher = ChaCha20Poly1305::new(key);

        // Decode base64
        let nonce_bytes = general_purpose::STANDARD
            .decode(nonce)
            .map_err(|e| e.to_string())?;
        let nonce = Nonce::from_slice(&nonce_bytes);

        let ciphertext = general_purpose::STANDARD
            .decode(plaintext)
            .map_err(|e| e.to_string())?;

        // Decrypt
        let decrypted_data = cipher.decrypt(nonce, ciphertext.as_ref())
            .map_err(|e| e.to_string())?;

        Ok(String::from_utf8(decrypted_data).map_err(|e| e.to_string())?)
    }
}