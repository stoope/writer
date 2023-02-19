<script lang="ts">
  import "@fontsource/fira-code";
  import ClearEditor from "./lib/ClearEditor.svelte";
  import DarkMode from "./lib/DarkMode.svelte";
  import Editor from "./lib/Editor.svelte";
  import Spellcheck from "./lib/Spellcheck.svelte";
  import Statistics from "./lib/Statistics.svelte";
  import Stopwatch from "./lib/Stopwatch.svelte";
  import Time from "./lib/Time.svelte";
</script>

<main class="container">
  <div class="time">
    <Time />
  </div>
  <div class="actions">
    <DarkMode />
    <Spellcheck />
    <ClearEditor />
  </div>
  <div class="editor">
    <Editor />
  </div>
  <div class="stopwatch">
    <Stopwatch />
  </div>
  <div class="statistics">
    <Statistics />
  </div>
</main>

<style>
  .container {
    max-width: 750px;
    padding: 2rem 1rem;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    grid-template-areas:
      "time actions actions"
      "editor editor editor"
      "stopwatch statistics statistics";
  }

  .editor {
    grid-area: editor;
  }

  .stopwatch {
    grid-area: stopwatch;
  }

  .time {
    grid-area: time;
    display: grid;
    align-items: center;
  }

  .statistics {
    grid-area: statistics;
    margin-left: auto;
  }

  .actions {
    grid-area: actions;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  :global(.actions > :not(:last-child)) {
    margin-right: 0.5rem;
  }

  @media only screen and (max-width: 560px) {
    .container {
      padding: 1rem;
    }
  }

  @media only screen and (max-width: 440px) {
    .container {
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto 1fr auto auto;
      gap: 1rem;
      grid-template-areas:
        "time actions actions"
        "editor editor editor"
        "stopwatch stopwatch stopwatch"
        "statistics statistics statistics";
    }

    .statistics {
      margin-right: auto;
      margin-left: auto;
    }

    .stopwatch {
      margin-right: auto;
      margin-left: auto;
    }
  }
</style>
