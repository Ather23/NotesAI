import { Chat } from "openai/resources/index.mjs";
import { ChatMessage } from "../components/chatResponse/ChatMessage";

export class ChatSession{
    public session:string;
    public chatMessages: Map<Number,ChatMessage>;
    private nextMsgIdx:number;

    constructor(session:string){
        this.chatMessages = new Map<number, ChatMessage>();
        this.nextMsgIdx=0;
        this.session = session;
    }

    public setMessage(message:ChatMessage){
        this.chatMessages.set(this.nextMsgIdx, message);
        this.nextMsgIdx++;
    }
}