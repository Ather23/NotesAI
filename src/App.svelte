<script lang="ts">
  import "./app.pcss";
  import Main from "./components/Main.svelte";
  import ChatApp from "./components/ChatApp.svelte";
</script>

<main class="container">
  <div class="h-screen">
    <Main />
    <div class="h-screen">
      <ChatApp />
    </div>
  </div>
  <slot />
</main>
