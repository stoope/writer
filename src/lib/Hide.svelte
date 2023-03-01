<script lang="ts">
  import { focus } from "./stores/editor";
  import { fullscreen } from "./stores/app";
  import IconButton from "./IconButton.svelte";
  import { classnames } from "./utils/classnames";

  function toggle() {
    if (!import.meta.env.VITE_WEB) {
      window.ipcRenderer.invoke("minimize");
    }

    focus();
  }
</script>

<div class="container">
  <IconButton
    disabled={$fullscreen}
    on:click={toggle}
    class={classnames("hide-button", $fullscreen && "hide-button--fullscreen")}
    title="Minimize"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 24 24"
      ><path d="M2 12a1 1 0 0 1 1-1h18a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Z" /></svg
    ></IconButton
  >
</div>

<style>
  .container :global(.hide-button) {
    border-radius: 50%;
    padding: 3px;
    -webkit-app-region: no-drag;
    color: var(--black);
    background-color: rgb(var(--orange-rgb));
  }
  .container :global(.hide-button--fullscreen) {
    opacity: 0.3;
    background-color: rgba(var(--comment-rgb), 0.2);
  }
</style>
