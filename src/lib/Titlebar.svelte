<script lang="ts">
  import Close from "./Close.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Hide from "./Hide.svelte";
  import Theme from "./Theme.svelte";
  import Time from "./Time.svelte";
  import { classnames } from "./utils/classnames";
</script>

<div
  class={classnames("container", import.meta.env.VITE_WEB && "container-web")}
>
  {#if !import.meta.env.VITE_WEB}
    <div class="control close"><Close /></div>
    <div class="control hide"><Hide /></div>
  {/if}
  <div class="control fullscreen"><Fullscreen /></div>
  <div class="control time"><Time /></div>
  <div class="control theme"><Theme /></div>
</div>

<style>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: auto auto auto 1fr auto;
    grid-template-rows: auto;
    gap: 0.5rem;
    grid-template-areas: "close hide fullscreen time theme";
  }
  .container-web {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "fullscreen time theme";
  }
  .close {
    grid-area: close;
  }
  .hide {
    grid-area: hide;
  }
  .fullscreen {
    grid-area: fullscreen;
  }
  .time {
    grid-area: time;
  }
  .theme {
    grid-area: theme;
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
</style>
