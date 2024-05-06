<script lang="ts">
  import "./app.pcss";
  import ChatApp from "./components/ChatApp.svelte";
  import Notepad from "./components/Notepad.svelte";
  import AppDrawer from "./components/AppDrawer.svelte";
  import { getContext } from "svelte";
  import { getDrawerStateFromLocalStorage } from "./lib/stores/DrawerState";

  let menuItem: number = 0;
  function onMenuItemClick(): number {
    let dstate = getDrawerStateFromLocalStorage() as DrawerState;
    console.log(dstate);
    let drawerState = getDrawerStateFromLocalStorage() as DrawerState;
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
