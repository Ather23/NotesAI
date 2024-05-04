<script lang>
  import AppDrawer from "./AppDrawer.svelte";
  import { GradientButton } from "flowbite-svelte";
  let drawerHidden = true;
  console.log(drawerHidden);
</script>

<div class="h-max pb-2">
  <GradientButton
    color="lime"
    on:click={() => {
      drawerHidden = false;
      console.log("Main: " + drawerHidden);
    }}
  ></GradientButton>
  <AppDrawer {drawerHidden} />
</div>
