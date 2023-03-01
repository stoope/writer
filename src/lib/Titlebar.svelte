<script lang="ts">
  import Close from "./Close.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Hide from "./Hide.svelte";
  import Theme from "./Theme.svelte";
  import Time from "./Time.svelte";
</script>

<div class="container">
  <div class="left control">
    <div class="control"><Time /></div>
    <div class="control"><Theme /></div>
  </div>

  {#if !import.meta.env.VITE_WEB}
    <div class="control"><Close /></div>
    <div class="control"><Hide /></div>
  {/if}
  <div class="control"><Fullscreen /></div>
</div>

<style>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  .control {
    margin-right: 0.5rem;
  }

  .left {
    display: flex;
    align-items: center;
    user-select: none;
    margin-left: 0.5rem;
    margin-right: auto;
  }
</style>
