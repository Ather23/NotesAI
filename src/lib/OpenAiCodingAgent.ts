import OpenAI from 'openai';
import { ChatMessage } from '../components/chatResponse/ChatMessage';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { invoke } from '@tauri-apps/api/tauri'
import { Utils } from '../utils';

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

        let key = await read_openai_key();
        if (Utils.isUndefined(key)){
           throw new Error("OpenAI Key not found");
        }
     
        const openai = new OpenAI({ apiKey: key ,dangerouslyAllowBrowser: true } );    
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

async function read_openai_key(): Promise<string | undefined> {

    try {
        const key = await invoke('read_config');
        return key as string; // Return the key directly
    } catch (e) {
        throw new Error("unable to read open ai key: " + e);
    }
}