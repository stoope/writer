<script lang="ts">
  import { focus } from "../stores/editor";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    window.electron.minimize();
    focus();
  }
</script>

<IconButton
  clickHandler={toggle}
  style="background-color: var(--orange); border-radius: 50%; color: rgb(34, 33, 44); padding: 3px;"
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
