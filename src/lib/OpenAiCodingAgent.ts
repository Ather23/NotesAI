import OpenAI from 'openai';
import { ChatMessage } from '../components/chatResponse/ChatMessage';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export interface IAgent {
    name: string;
    description: string;
    prompt: string;
    instructions: string;
}

export class OpenAIhistory{
    msg:string;
    role:string;
    constructor(msg:string, role:string){
        this.msg = msg;
        this.role=role;
    }
}
export class AgentConfig {
    name: string;
    description: string;
    instructions: string;
    constructor(name: string, description: string, prompt: string, instructions: string) {
        this.name = name;
        this.description = description;
        this.instructions = instructions;
    }
}
export class OpenAiCodingAgent implements IAgent {
    name!: string;
    description!: string;
    prompt!: string;
    instructions!: string;
    constructor() { }

    public async setAgentConfig(agentConfig: AgentConfig) {
        this.name = agentConfig.name;
        this.description = agentConfig.description;
        this.instructions = agentConfig.instructions;
        return this;
    }

    async * predict(text: string, chatHistory:Array<ChatMessage>): AsyncGenerator<string> {
        console.log("predict .." +chatHistory)
        
        let history : ChatCompletionMessageParam[] = chatHistory.map((h)=>{
            return {
                    "role" : h.isAgent ? "assistant" : "user",
                    "content":h.msg
            } as ChatCompletionMessageParam
        })

        const openai = new OpenAI({ apiKey: "<you-key>",dangerouslyAllowBrowser: true } );    
        const aiStream = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            stream: true,
            messages:history,            
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        for await (const part of aiStream) {
            console.log("part.. "+part)
            if (part.choices[0]?.finish_reason == "stop") {
                break;
            }

            const token = part.choices[0]?.delta?.content || '';
            yield token;
        }
    }
}