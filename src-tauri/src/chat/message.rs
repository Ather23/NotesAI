use chrono::{ DateTime, Utc };

#[derive(Debug, Clone)]
pub struct ChatMessage {
    pub index: i32,
    pub message: String,
    pub message_type: String,
    pub create_date: DateTime<Utc>,
}
