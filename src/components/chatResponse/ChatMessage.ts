export class ChatMessage{
    
    public agentName:string|null;
    public msg:string;
    public isAgent:boolean
    constructor(agentName:string|null = null, isAgent:boolean, msg:string){
        this.agentName = agentName;
        this.isAgent = isAgent;
        this.msg = msg;
    }

    public getMessage():string{ 
        if (this.msg === null || this.msg === undefined){
            return "";
        }       
        return this.msg as string;
    }

    public appendMessage(token:string):ChatMessage{
        this.msg = this.msg+token;
        return this;
    }
}