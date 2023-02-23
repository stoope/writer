<script lang="ts">
  import { focus } from "./stores/editor";
  import { fullscreen } from "./stores/app";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    window.ipcRenderer.invoke("minimize");

    focus();
  }
</script>

<IconButton
  disabled={$fullscreen}
  clickHandler={toggle}
  style={`background-color: ${
    $fullscreen ? "rgba(var(--comment-rgb), 0.2)" : "var(--orange)"
  }; border-radius: 50%; color: rgb(34, 33, 44); padding: 3px; -webkit-app-region: no-drag; ${
    $fullscreen ? "opacity: 0.3;" : ""
  }`}
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
