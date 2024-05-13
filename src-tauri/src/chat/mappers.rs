use super::{
    chat_session::ChatSession,
    message::ChatMessage,
    persistence::{ PersistedChatMessage, PersistedChatSession },
};

impl From<PersistedChatSession> for ChatSession {
    fn from(dto: PersistedChatSession) -> Self {
        let msg = dto.chat_messages
            .into_iter()
            .map(|c| {
                ChatMessage {
                    index: c.index,
                    message: c.message,
                    create_date: c.create_date.parse().expect("Failed to parse date"),
                    message_type: c.message_type,
                }
            })
            .collect();

        Self {
            session_id: dto.session_id,
            create_date: dto.create_date.parse().expect("Failed to parse date"),
            chat_messages: msg,
        }
    }
}

impl From<ChatMessage> for PersistedChatMessage {
    fn from(chat_message: ChatMessage) -> Self {
        PersistedChatMessage {
            index: chat_message.index,
            message: chat_message.message,
            message_type: chat_message.message_type,
            create_date: chat_message.create_date.to_string(),
        }
    }
}

impl From<ChatSession> for PersistedChatSession {
    fn from(chat_session: ChatSession) -> Self {
        PersistedChatSession {
            session_id: chat_session.session_id,
            create_date: chat_session.create_date.to_string(),
            chat_messages: chat_session.chat_messages
                .into_iter()
                .map(|c| {
                    PersistedChatMessage {
                        index: c.index,
                        message: c.message,
                        create_date: c.create_date.to_string(),
                        message_type: c.message_type,
                    }
                })
                .collect(),
        }
    }
}
