<script lang="ts">
  import "@fontsource/courier-prime/latin-400.css";
  import { onMount } from "svelte";
  import {
    ref,
    value,
    scrollTop,
    handleSelectionChange,
    focus,
  } from "./stores/editor";

  onMount(() => {
    focus();

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  });

  function handleScroll(event: Event) {
    scrollTop.set((event.target as HTMLTextAreaElement).scrollTop);
  }
</script>

<textarea
  bind:this={$ref}
  bind:value={$value}
  spellcheck={false}
  on:scroll={handleScroll}
  class="editor"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
/>

<style>
  .editor {
    font-family: "Courier Prime", monospace;
    font-size: 1.2rem;
    width: calc(100% - 10px);
    position: relative;
    right: -5px;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5rem;
    resize: none;
    background: transparent;
    border: 0;
    color: var(--foreground);
    overflow-y: overlay;
    padding-right: 10px;
  }
  .editor::-webkit-scrollbar-track {
    border: none;
    background-color: transparent;
    border-radius: 10px;
  }

  .editor::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }

  .editor::-webkit-scrollbar-thumb {
    background-color: rgba(var(--comment-rgb), 0.5);
    border-radius: 10px;
  }

  .editor:focus {
    outline: none;
  }
</style>
