const EOL = "\n";

function countCharacters(
  text: string,
  selectionStart: number,
  selectionEnd: number
) {
  let count = 0;

  for (let i = selectionStart; i < selectionEnd; i += 1) {
    if (/\s/g.test(text[i]) || text[i] === EOL) {
      continue;
    }
    count += 1;
  }

  return count;
}

export { countCharacters };
