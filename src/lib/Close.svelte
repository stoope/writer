<script lang="ts">
  import { focus } from "./stores/editor";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    window.ipcRenderer.invoke("close");
    focus();
  }
</script>

<div class="container">
  <IconButton on:click={toggle} class="close-button" title="Close">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 24 24"
      ><path
        d="M4.293 18.293 10.586 12 4.293 5.707a1 1 0 0 1 1.414-1.414L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 1 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414Z"
      /></svg
    ></IconButton
  >
</div>

<style>
  .container :global(.close-button) {
    background-color: var(--red);
    border-radius: 50%;
    padding: 3px;
    -webkit-app-region: no-drag;
    color: var(--background-dark);
  }
</style>
