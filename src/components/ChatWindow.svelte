<script lang="ts">
  import { ChatMessage } from "./chatResponse/ChatMessage";
  import ChatMessageComponent from "./chatResponse/ChatMessageComponent.svelte";
  import { AgentConfig, OpenAiCodingAgent } from "../lib/OpenAiCodingAgent";
  import { ChatSession } from "../lib/ChatSession";
  import { Textarea, Toolbar, ToolbarButton } from "flowbite-svelte";
  import { FileCopyAltSolid, PaperPlaneSolid } from "flowbite-svelte-icons";

  let chatArray: ChatMessage[] = [];

  //todo: store this locally?
  export let chatSession: ChatSession;
  export let agentResponse = "";
  let userMessage = "";

  let instructions =
    "Your are a helpful assistant that can answer relevant questions. Your response should be formatted clearly in markdow format. Create new line between bullet points.";
  let config = new AgentConfig(
    "agent",
    "this is a description",
    "remove this",
    instructions
  );

  async function predict() {
    if (userMessage == "") {
      return;
    }

    let prompMsg = userMessage;
    userMessage = "";

    let openAiAgent = new OpenAiCodingAgent();
    openAiAgent.setAgentConfig(config);
    chatArray.push(new ChatMessage("user", false, prompMsg));
    chatArray = chatArray;
    let stream = await openAiAgent.predict(prompMsg, chatArray);

    // Iterate through the generator
    for await (const prediction of stream) {
      console.log(prediction);
      agentResponse = agentResponse.concat(prediction);
    }
    chatArray.push(new ChatMessage("agent", true, agentResponse));
    agentResponse = "";
    chatArray = chatArray;
  }
</script>

<div class="w-full h-full flex flex-col">
  <div class="flex-1 overflow-y-auto overflow-x-hidden">
    {#each chatArray as chat}
      <ChatMessageComponent msg={chat.msg} isAgent={chat.isAgent} />
    {/each}
    {#if agentResponse != ""}
      <!--todo: make this cleaner? -->
      <div>
        <ChatMessageComponent msg={agentResponse} isAgent={true} />
      </div>
    {/if}
  </div>
  <div class="flex items-center justify-between">
    <div class="flex-1 mb-10">
      <Textarea
        id="textarea-id"
        placeholder="Your message"
        rows="5"
        name="message"
        bind:value={userMessage}
      >
        <Toolbar slot="footer" embedded>
          <ToolbarButton slot="end" on:click={predict}>
            <PaperPlaneSolid class="w-5 h-5 rotate-45" />
          </ToolbarButton>
        </Toolbar>
      </Textarea>
    </div>
  </div>
</div>
