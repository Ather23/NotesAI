<script lang="ts">
  import ChatWindow from "./ChatWindow.svelte";
  import { ChatMessage } from "./chatResponse/ChatMessage";
  import { ChatArrayStore } from "../lib/stores/ChatArrayStore";
  import { ChatSession } from "../lib/ChatSession";

  function generate_session() {
    return "session_1";
  }
</script>

<div class="flex flex-col h-screen w-screen px-5">
  <ChatWindow chatSession={new ChatSession(generate_session())}></ChatWindow>
</div>
