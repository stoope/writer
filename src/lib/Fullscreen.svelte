<script lang="ts">
  import { focus } from "../stores/editor";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    window.electron.toggleFullscreen();
    focus();
  }
</script>

<IconButton
  clickHandler={toggle}
  style="background-color: var(--green); border-radius: 50%; color: rgb(34, 33, 44); padding: 3px;"
  title="Toggle fullscreen"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    viewBox="0 0 24 24"
    ><path
      d="M3 20v-8a1 1 0 0 1 2 0v5.585L17.586 5H12a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.414L6.414 19H12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1Z"
    /></svg
  ></IconButton
>
