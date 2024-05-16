import { ChatMessage } from "../../components/chatResponse/ChatMessage";
import { ChatSession } from "../ChatSession";
import { ChatMessageStore, ChatSessionStore } from "../ChatSessionStore";
import type { IMapper } from "./IMapper";
import { emit, listen, type UnlistenFn, type Event } from "@tauri-apps/api/event";

export class SessionStoreToChatSession implements IMapper<ChatSessionStore, ChatSession>{
    Map(from: ChatSessionStore): ChatSession {
        let session = new ChatSession(from.sessionId as string);
        from.chatMessages.map((c) => session.setMessage(new ChatMessageStoreToChatMessage().Map(c)));
        return session;
    }    
}

export class ChatMessageStoreToChatMessage implements IMapper<ChatMessageStore, ChatMessage>{
    Map(from: ChatMessageStore): ChatMessage {
        return new ChatMessage(from.messageType, true, from.message);
    }
}

export class TauriEventToChatMessageStore implements IMapper<any,ChatMessageStore>{
    Map(from: any): ChatMessageStore {
       return new ChatMessageStore(from.index, from.message, from.message_type, from.create_date);
    }    
}

export class TauriEventToSessionStore implements IMapper<Event<unknown>,ChatSessionStore>{
    Map(from: Event<unknown>): ChatSessionStore {
       let payload = from.payload as any;
       let msgs = payload.chat_messages as any[];
       let session = new ChatSessionStore(payload.session_id, payload.create_date);
        
       msgs.map((m)=> session.addChatMsg(new TauriEventToChatMessageStore().Map(m)));
       return session;
    }    
}