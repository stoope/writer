<script lang="ts">
  export let selected = false;
  export let clickHandler = undefined;
</script>

<button
  class="container"
  class:selected
  on:click={clickHandler}
  {...$$restProps}
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
