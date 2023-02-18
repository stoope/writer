<script lang="ts">
  import { value, focus } from "../stores/editor";
  import IconButton from "./IconButton.svelte";

  function clear() {
    value.set("");
    focus();
  }
</script>

<IconButton clickHandler={clear} title="Clear editor"
  ><svg
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 9L15 15"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 9L9 15"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></IconButton
>
