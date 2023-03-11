const EOL = "\n";

function countParagraphs(
  text: string,
  selectionStart: number,
  selectionEnd: number
) {
  let count = 0;
  let currentLength = 0;

  for (let i = selectionStart; i < selectionEnd; i += 1) {
    if (text[i] === EOL) {
      if (currentLength > 0) {
        count += 1;
      }
      currentLength = 0;
    } else {
      if (/\s/g.test(text[i])) {
        continue;
      }
      currentLength += 1;
    }
  }

  if (currentLength > 0) {
    count += 1;
  }

  return count;
}

export { countParagraphs };
