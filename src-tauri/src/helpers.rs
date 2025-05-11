use rand::{distributions::Alphanumeric, Rng};

fn gen_random_key() -> String {
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16)
        .map(char::from)
        .collect()
}