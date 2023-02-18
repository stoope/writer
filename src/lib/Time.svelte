<script lang="ts">
  import { onMount } from "svelte";

  let time = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const formatter = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  });
</script>

<div title="Current time" class="container">
  {formatter.format(time)}
</div>

<style>
  .container {
    color: var(--comment);
  }
</style>
