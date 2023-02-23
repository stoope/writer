const EOL = "\n";

function countParagraphs(text: string) {
  return text.split(EOL).filter(Boolean).length;
}

export { countParagraphs };
