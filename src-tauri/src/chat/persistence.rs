use std::clone;

use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PersistedChatSession {
    pub session_id: String,
    pub create_date: String,
    pub chat_messages: Vec<PersistedChatMessage>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PersistedChatMessage {
    pub index: i32,
    pub message: String,
    pub message_type: String,
    pub create_date: String,
}
