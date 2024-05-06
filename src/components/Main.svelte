<script lang="ts">
  import AppDrawer from "./AppDrawer.svelte";
  import { Drawer, GradientButton } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  let drawerHidden = true;
</script>

<div class="h-max pb-2">
  <GradientButton
    color="blue"
    on:click={() => {
      drawerHidden = false;
    }}
  ></GradientButton>
  <AppDrawer {drawerHidden} />
</div>
