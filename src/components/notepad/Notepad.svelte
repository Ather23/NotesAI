<script lang="ts">
  import { Carta, Markdown, MarkdownEditor } from "carta-md";
  import { attachment } from "@cartamd/plugin-attachment";
  import { emoji } from "@cartamd/plugin-emoji";
  import { slash } from "@cartamd/plugin-slash";
  import { code } from "@cartamd/plugin-code";

  import "../../lib/styles/github.scss";
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import { ChartPieSolid } from "flowbite-svelte-icons";

  const carta = new Carta({
    sanitizer: false,
    extensions: [
      attachment({
        async upload() {
          return "some-url-from-server.xyz";
        },
      }),
      emoji(),
      slash(),
      code(),
    ],
  });
  export let value = `This is an example inspired by [GitHub](https://github.com)
\`\`\`js
console.log('Hello, World!');
\`\`\``;
</script>

<div class="flex h-screen bg-gray-800 m-2">
  <div class="flex h-full overflow-y-auto">
    <Sidebar>
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem label="2024-05-08"></SidebarItem>
          <SidebarItem label="2024-05-09"></SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </div>
  <div class="flex h-full w-full">
    <div class="flex h-3/4 w-1/2">
      <MarkdownEditor bind:value mode="tabs" theme="github" {carta} />
    </div>
    <div class="m-5 bg-gray-800 text-white font-mono h-3/4 w-1/2">
      {#key value}
        <Markdown theme="github" {value} {carta} />
      {/key}
    </div>
  </div>
</div>
