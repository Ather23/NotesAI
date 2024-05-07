<script lang="ts">
  import {
    Drawer,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    CloseButton,
    GradientButton,
  } from "flowbite-svelte";
  import { GridSolid } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";
  import { saveDrawerMenuSelection } from "../sessionStorage";

  export let drawerHidden = true;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  function setSelectedMenuIndex(index: number) {
    saveDrawerMenuSelection(index);
  }
</script>

<div class="h-max pb-2">
  <GradientButton
    color="blue"
    on:click={() => {
      drawerHidden = !drawerHidden;
    }}
  ></GradientButton>
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
            drawerHidden = false;
          }}
          class="mb-4 dark:text-white"
        />
      </div>
      <Sidebar>
        <SidebarGroup>
          <SidebarItem
            label="Chat"
            on:click={() => {
              setSelectedMenuIndex(0);
            }}
          >
            <svelte:fragment slot="icon">
              <GridSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem
            label="Notepad"
            on:click={() => {
              setSelectedMenuIndex(1);
            }}
          >
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
</div>
