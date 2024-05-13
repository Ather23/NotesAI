use std::{ fs::File, io::Write };

use chrono::{ DateTime, Utc };
use rand::{ distributions::Alphanumeric, Rng };

use super::{ message::ChatMessage, persistence::{ PersistedChatMessage, PersistedChatSession } };

#[derive(Debug, Clone)]
pub struct ChatSession {
    pub session_id: String,
    pub create_date: DateTime<Utc>,
    pub chat_messages: Vec<ChatMessage>,
}

impl ChatSession {
    pub fn new(session_id: &str) -> Self {
        Self {
            session_id: session_id.to_owned(),
            create_date: Utc::now(),
            chat_messages: Vec::new(),
        }
    }
}

trait SessionEventHandler {
    fn handle_new_message(&self, message: &ChatMessage);
}

pub struct ChatSessionManager {
    pub chat_session: Option<ChatSession>,
    pub message_handlers: Vec<Box<dyn SessionEventHandler>>,
}

impl ChatSessionManager {
    pub fn new() -> Self {
        ChatSessionManager {
            chat_session: None,
            message_handlers: Vec::new(),
        }
    }

    pub fn create_new_session(mut self) -> Self {
        if self.chat_session.is_none() {
            self.chat_session = Some(ChatSession::new(&self.generate_session_id()));
        }
        self
    }

    pub fn add_handler(mut self, handler: Box<dyn SessionEventHandler>) -> Self {
        self.message_handlers.push(handler);
        self
    }

    pub fn generate_session_id(&self) -> String {
        let rng: rand::prelude::ThreadRng = rand::thread_rng();
        rng.sample_iter(&Alphanumeric).take(10).map(char::from).collect()
    }

    pub fn add_message(mut self, msg: &ChatMessage) {
        // if let Some(session) = &self.chat_session {
        //     for handler in &self.message_handlers {
        //         handler.handle_new_message(&msg);
        //     }
        // }
        if let Some(ref mut session) = self.chat_session {
            session.chat_messages.push(msg.to_owned());
        }

        self.persist_chat_session().unwrap();
    }

    pub fn persist_chat_session(&self) -> Result<(), ()> {
        /// TODO: CLEANUP AND BETTER ERROR HANDLING
        if let Some(ref session) = self.chat_session {
            let persisted_session: PersistedChatSession = session.to_owned().into();
            let serialized = serde_json::to_string(&persisted_session).unwrap();

            let mut path = "D:\\git_repos\\chat_cache\\data\\".to_string();
            path.push_str(&session.session_id.to_owned());
            let mut file = File::create(path).unwrap();
            file.write_all(serialized.as_bytes());

            return Ok(());
        } else {
            // Handle the case where there is no chat session
            Err(())
        }
    }
}
