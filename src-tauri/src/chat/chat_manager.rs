use std::{ borrow::Borrow, fmt::Debug, fs::File, io::{ Error, Read, Write } };

use super::persistence::PersistedChatSession;

#[derive(Default)]
pub struct ChatManager {
    path: String,
}
impl ChatManager {
    pub fn new(path: &str) -> Self {
        Self {
            path: path.to_owned(),
        }
    }

    pub fn load_history_from_path(&self) -> Result<PersistedChatSession, Error> {
        let mut file = File::open(&self.path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        let message: PersistedChatSession = serde_json::from_str(&contents)?;
        Ok(message)
    }
}
