<script lang="ts">
  import { Toolbar, ToolbarButton } from "flowbite-svelte";
  import { FileCopyAltSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let msg: string;
  export let isAgent: boolean;

  function copyToClipboard() {}

  onMount(() => {
    const codeElements = document.querySelectorAll("pre");
    codeElements.forEach((codeElement) => {
      codeElement.style.backgroundColor = "hsl(0, 0%, 20%)";
      codeElement.style.padding = "10px";
      codeElement.style.color = "white";
    });
  });
</script>

<div>
  {#if isAgent}
    <div
      class="font-mono text-lime-500 bg-zinc-800 mb-3 leading-relaxed rounded-lg"
    >
      <div class="text-white">
        <Toolbar slot="header" embedded>
          <ToolbarButton slot="end">
            <FileCopyAltSolid size="md" on:click={copyToClipboard} />
          </ToolbarButton>
        </Toolbar>
      </div>
      <div class="pl-3 pb-2 pr-3">
        <p>
          <SvelteMarkdown source={msg} />
        </p>
      </div>
    </div>
  {:else}
    <div class="font-mono text-white leading-relaxed pb-2">
      <div>
        <p>
          <b>U: </b>
          {msg}
        </p>
      </div>
    </div>
  {/if}
</div>
