import { countCharacters } from "../countCharacters";

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function calculatePosition(text: string, selectionEnd: number) {
  if (selectionEnd <= 0) {
    return 0;
  }

  const before = countCharacters(text, 0, selectionEnd);
  const after = countCharacters(text, selectionEnd, text.length);

  if (before + after === 0) {
    return 0;
  }

  return clamp((before / (before + after)) * 100, 0, 100);
}

export { calculatePosition };
