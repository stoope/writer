<script lang="ts">
  import "@fontsource/fira-code";
  import Editor from "./lib/Editor.svelte";
  import Statistics from "./lib/Statistics.svelte";
  import Stopwatch from "./lib/Stopwatch.svelte";
  import Titlebar from "./lib/Titlebar.svelte";
</script>

<main class="container">
  <Titlebar />
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
    -webkit-app-region: no-drag;
    max-width: 750px;
    padding: 2.5rem 2rem 1rem 2rem;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    gap: 1rem;
    grid-template-areas:
      "editor editor"
      "stopwatch statistics";
  }

  .editor {
    grid-area: editor;
  }

  .stopwatch {
    grid-area: stopwatch;
    user-select: none;
  }

  .statistics {
    grid-area: statistics;
    margin-left: auto;
    user-select: none;
    display: grid;
    align-items: center;
  }

  @media only screen and (max-width: 560px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto auto;
      gap: 1rem;
      grid-template-areas:
        "editor"
        "stopwatch"
        "statistics";
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
