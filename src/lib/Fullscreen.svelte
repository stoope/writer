<script lang="ts">
  import { focus } from "./stores/editor";
  import { fullscreen } from "./stores/app";
  import { closeFullscreen, openFullscreen } from "./utils/fullscreen";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    if (import.meta.env.VITE_WEB) {
      fullscreen.update((value) => {
        try {
          if (value) {
            closeFullscreen();
          } else {
            openFullscreen();
          }
          return !value;
        } catch (error) {}
      });
    } else {
      window.ipcRenderer.invoke("toggleFullscreen");
      fullscreen.update((value) => !value);
    }
    focus();
  }
</script>

<div class="container">
  <IconButton
    on:click={toggle}
    class="fullscreen-button"
    title="Toggle fullscreen"
  >
    {#if $fullscreen}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={10}
        height={10}
        fill="none"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M21.707 3.707 16.414 9H20a1 1 0 1 1 0 2h-6.003a.997.997 0 0 1-.702-.29l-.004-.005a.997.997 0 0 1-.291-.702V4a1 1 0 1 1 2 0v3.586l5.293-5.293a1 1 0 1 1 1.414 1.414ZM9 20a1 1 0 1 0 2 0v-6.003a.997.997 0 0 0-.997-.997H4a1 1 0 1 0 0 2h3.586l-5.293 5.293a1 1 0 1 0 1.414 1.414L9 16.414V20Z"
        /></svg
      >
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={10}
        height={10}
        fill="none"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M21.71 2.295a.995.995 0 0 1 .29.702V9a1 1 0 1 1-2 0V5.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L18.586 4H15a1 1 0 1 1 0-2h6c.275 0 .524.111.705.29l.004.005ZM10.707 14.707 5.414 20H9a1 1 0 1 1 0 2H2.997a.997.997 0 0 1-.702-.29l-.004-.005A.997.997 0 0 1 2 21v-6a1 1 0 1 1 2 0v3.586l5.293-5.293a1 1 0 0 1 1.414 1.414Z"
        /></svg
      >{/if}</IconButton
  >
</div>

<style>
  .container :global(.fullscreen-button) {
    background-color: rgb(var(--green-rgb));
    border-radius: 50%;
    color: var(--black);
    padding: 3px;
    -webkit-app-region: no-drag;
  }
</style>
