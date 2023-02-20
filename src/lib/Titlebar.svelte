<script lang="ts">
  import Close from "./Close.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Hide from "./Hide.svelte";
</script>

<div class="container">
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
    justify-content: flex-end;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
</style>
