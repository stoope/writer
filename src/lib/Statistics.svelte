<script lang="ts">
  import { get } from "svelte/store";
  import { selectionEnd, selectionStart, value } from "./stores/editor";
  import { calculatePosition } from "./utils/calculatePosition";
  import { countCharacters } from "./utils/countCharacters";
  import { countParagraphs } from "./utils/countParagraphs";
  import { countSentences } from "./utils/countSentences";
  import { countWords } from "./utils/countWords";

  let characters = 0;
  let words = 0;
  let sentences = 0;
  let paragraphs = 0;
  let position = 0;

  function calculate() {
    let _value = get(value);
    let _selectionEnd = get(selectionEnd);
    let _selectionStart = get(selectionStart);

    if (_selectionEnd == _selectionStart) {
      _selectionStart = 0;
      _selectionEnd = _value.length;
    }

    characters = countCharacters(_value, _selectionStart, _selectionEnd);
    words = countWords(_value, _selectionStart, _selectionEnd);
    sentences = countSentences(_value, _selectionStart, _selectionEnd);
    paragraphs = countParagraphs(_value, _selectionStart, _selectionEnd);
    position = calculatePosition(_value, _selectionEnd);
  }

  value.subscribe(calculate);
  selectionEnd.subscribe(calculate);
  selectionStart.subscribe(calculate);
</script>

<span class="container">
  {#if $selectionStart !== $selectionEnd}
    <span class="selection-range" title="Selected range">
      [{$selectionStart},{$selectionEnd}]
    </span>
  {/if}
  <span title="Character count">{characters}C</span>
  <span title="Words count">{words}W</span>
  <span title="Sentences count">{sentences}S</span>
  <span title="Paragraphs count">{paragraphs}P</span>
  <span title="Cursor position" class="position">
    {position.toFixed(2).padStart(6, " ")}%
  </span>
</span>

<style>
  .container {
    color: var(--comment);
  }

  .selection-range {
    color: var(--accent);
  }

  .position {
    white-space: pre;
  }
</style>
