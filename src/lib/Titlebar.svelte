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
    top: 0.5rem;
    right: 0rem;
    display: flex;
  }
</style>
