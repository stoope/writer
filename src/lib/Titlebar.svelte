<script lang="ts">
  import Close from "./Close.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Hide from "./Hide.svelte";
  import Time from "./Time.svelte";
</script>

<div class="container">
  <div class="time"><Time /></div>

  <Close />
  <Hide />
  <Fullscreen />
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

  .time {
    display: grid;
    align-items: center;
    user-select: none;
    margin-left: 0.5rem;
    margin-right: auto;
  }
</style>
