<script lang="ts">
  import { ChatMessage } from "./chatResponse/ChatMessage";
  import ChatMessageComponent from "./chatResponse/ChatMessageComponent.svelte";
  import { AgentConfig, OpenAICodingAgent } from "../lib/OpenAICodingAgent";
  import { ChatSession } from "../lib/ChatSession";
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    Textarea,
    Toolbar,
    ToolbarButton,
  } from "flowbite-svelte";
  import {
    ChartPieSolid,
    FileCopyAltSolid,
    PaperPlaneSolid,
  } from "flowbite-svelte-icons";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
  import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
  import { Utils } from "../lib/utils";
  import {
    SessionStoreToChatSession,
    TauriEventToChatMessageStore,
    TauriEventToSessionStore,
  } from "../lib/mappers/Mappers";

  let unlisten: UnlistenFn;

  let chatArray: ChatMessage[] = [];
  let chatSession: ChatSession;

  let mesgFromRust: object;
  invoke("frontend_is_ready");

  //todo: store this locally?
  export let agentResponse = "";
  let userMessage = "";

  let chatSessions: string[] = [];

  let instructions =
    "Your are a helpful assistant that can answer relevant questions. Your response should be formatted clearly in markdow format. Create new line between bullet points.";
  let config = new AgentConfig(
    "agent",
    "this is a description",
    "remove this",
    instructions
  );

  async function load_chat_sessions(): Promise<void> {
    await invoke("list_all_sessions")
      .then((seh) => {
        console.log(seh);
        chatSessions = seh as string[];
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  }

  onMount(async () => {
    load_chat_sessions();
    unlisten = await listen("session_loaded", (e) => {
      console.log("loading session");
      if (!Utils.isUndefined(e.payload)) {
        console.log(e.payload);
        let storedSession = new TauriEventToSessionStore().Map(e);
        chatSession = new SessionStoreToChatSession().Map(storedSession);
        chatArray = chatSession.getMessageArray();
        console.log("chat array: " + chatArray);
      }
    });
  });

  function load_session_by_id(event: MouseEvent, session: string) {
    console.log("Session Id: " + session);
    invoke("load_session_by_id", { window: appWindow });
  }

  async function predict() {
    if (userMessage == "") {
      return;
    }

    let prompMsg = userMessage;
    userMessage = "";

    let openAiAgent = new OpenAICodingAgent();
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
  <div>{mesgFromRust}</div>
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        {#each chatSessions as session}
          <li>
            <button
              on:click={(e) => {
                load_session_by_id(e, session);
                // invoke("load_session_by_id", { window: appWindow });
              }}>{session}</button
            >
          </li>
        {/each}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
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
