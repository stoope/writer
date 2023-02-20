<script lang="ts">
  import { focus } from "../stores/editor";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    window.electron.close();
    focus();
  }
</script>

<IconButton
  clickHandler={toggle}
  style="background-color: var(--red); border-radius: 50%; color: rgb(34, 33, 44); padding: 3px; -webkit-app-region: no-drag;"
  title="Close"
>
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
