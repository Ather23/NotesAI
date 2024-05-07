<script lang="ts">
  import "./app.pcss";
  import ChatApp from "./components/ChatApp.svelte";
  import Notepad from "./components/Notepad.svelte";
  import AppDrawer from "./components/AppDrawer.svelte";
  import { getDrawerStateFromSessionStorage } from "./sessionStorage";

  let menuItem: number = 0;
  function onMenuItemClick(): number {
    let drawerState = getDrawerStateFromSessionStorage() as DrawerState;
    menuItem = drawerState.clickedMenuItemIndex;
    return drawerState.clickedMenuItemIndex as number;
  }
</script>

<main class="container">
  <AppDrawer drawerHidden />
  <div class="h-screen">
    {#if onMenuItemClick() === 0}
      <ChatApp />
    {:else if onMenuItemClick() === 1}
      <Notepad />
    {/if}
  </div>
</main>
