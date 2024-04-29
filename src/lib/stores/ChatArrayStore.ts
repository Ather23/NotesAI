import { derived, readonly, writable, type Writable } from 'svelte/store';
import type { ChatMessage } from '../../components/chatResponse/ChatMessage';
import { ChatSession } from '../ChatSession';
export const ChatArrayStore: Writable<Map<string, ChatSession>> = writable(new Map());
