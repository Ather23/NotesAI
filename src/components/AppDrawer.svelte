<script>
  import {
    Drawer,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    CloseButton,
  } from "flowbite-svelte";
  import { GridSolid } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";

  export let drawerHidden = false;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
</script>

<div id="drawer_nav">
  <Drawer
    transitionType="fly"
    {transitionParams}
    bind:hidden={drawerHidden}
    id="sidebar2"
  >
    <div class="justify-items-end">
      <CloseButton
        on:click={() => {
          console.log("CloseButton: " + drawerHidden);
          drawerHidden = true;
        }}
        class="mb-4 dark:text-white"
      />
    </div>
    <Sidebar>
      <SidebarGroup>
        <SidebarItem label="Agent" href="/agent">
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Notepad" href="/notepad">
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </Sidebar>
  </Drawer>
</div>
