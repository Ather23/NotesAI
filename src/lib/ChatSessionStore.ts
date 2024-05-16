export class ChatSessionStore {
    public sessionId: string | null;
    public createDate: string | null;
    public chatMessages: ChatMessageStore[] = [];

    constructor(sessionId: string | null = null, createDate: string) {
      this.sessionId = sessionId;
      this.createDate = createDate;
    }

    public addChatMsg( msg:ChatMessageStore) {
        this.chatMessages.push(msg);
    }
  }

  export class ChatMessageStore {
    public index: number;
    public message: string;
    public messageType: string;

    ///TODO: NEED TO CHANGE TO DATE TIME
    public createDate: string;

    constructor(
      index: number,
      message: string,
      messageType: string,
      createDate: string
    ) {
      this.index = index;
      this.message = message;
      this.messageType = messageType;
      this.createDate = createDate;
    }
  }