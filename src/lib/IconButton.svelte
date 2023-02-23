<script lang="ts">
  import { classnames } from "./utils/classnames";
  export let selected = false;
</script>

<button
  {...$$restProps}
  class={classnames("container", $$restProps.class)}
  class:selected
  on:click
>
  <slot />
</button>

<style>
  .container {
    color: var(--comment);
    appearance: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container:disabled {
    cursor: default;
  }
  .selected {
    color: var(--accent);
  }
</style>
