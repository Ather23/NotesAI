<script lang="ts">
  import { Textarea, Toolbar, ToolbarButton } from "flowbite-svelte";
  import { PaperPlaneSolid } from "flowbite-svelte-icons";

  export let msg: string | null = "";
  type InputFunction = (msg: string) => void;
  export let inputFunction: InputFunction;

  function onClick() {
    console.log(msg);
  }
</script>

<div class="flex-1 px-4 py-2 mb-10">
  <Textarea
    id="textarea-id"
    placeholder="Your message"
    rows="5"
    name="message"
    bind:value={msg}
  >
    <Toolbar slot="footer" embedded>
      <ToolbarButton slot="end" on:click={onclick}>
        <PaperPlaneSolid class="w-5 h-5 rotate-45" />
      </ToolbarButton>
    </Toolbar>
  </Textarea>
</div>
