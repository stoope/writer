<script lang="ts">
  import { focus } from "../stores/editor";
  import IconButton from "./IconButton.svelte";

  let timerID;
  let lastTimerStartTime = 0;
  let elapsedBeforeLastStart = 0;
  let running = false;
  let milliseconds = "000";
  let seconds = "00";
  let minutes = "00";
  let hours = "00";

  function startTimer() {
    running = true;
    lastTimerStartTime = Date.now();

    timerID = requestAnimationFrame(updateTimer);
    focus();
  }

  function pauseTimer() {
    running = false;
    elapsedBeforeLastStart += Date.now() - lastTimerStartTime;

    cancelAnimationFrame(timerID);
    focus();
  }

  function resetTimer() {
    running = false;
    cancelAnimationFrame(timerID);

    elapsedBeforeLastStart = 0;
    milliseconds = "000";
    seconds = "00";
    minutes = "00";
    hours = "00";
    focus();
  }

  function formatNumber(number, desiredLength) {
    const stringNumber = String(number);
    return stringNumber.padStart(desiredLength, "0");
  }

  function updateTimer() {
    const elapsed = Date.now() - lastTimerStartTime + elapsedBeforeLastStart;
    const secondsElapsed = elapsed / 1000;
    const minutesElapsed = secondsElapsed / 60;
    const hoursElapsed = minutesElapsed / 60;

    milliseconds = formatNumber(elapsed % 1000, 3);
    seconds = formatNumber(Math.floor(secondsElapsed) % 60, 2);
    minutes = formatNumber(Math.floor(minutesElapsed) % 60, 2);
    hours = formatNumber(Math.floor(hoursElapsed), 2);

    timerID = requestAnimationFrame(updateTimer);
  }
</script>

<div title="Current time" class="container">
  <span class:running>
    {hours}:{minutes}:{seconds}:{milliseconds}
  </span>
  <div>
    {#if running}
      <IconButton selected={running} clickHandler={pauseTimer}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
          />
        </svg></IconButton
      >
    {:else}
      <IconButton selected={running} clickHandler={startTimer}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
          />
        </svg></IconButton
      >
    {/if}
  </div>
  <div>
    <IconButton selected={running} clickHandler={resetTimer}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
        />
      </svg></IconButton
    >
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    color: var(--comment);
  }

  .container > :not(:last-child) {
    margin-right: 0.5rem;
  }

  .running {
    color: var(--accent);
  }
</style>
