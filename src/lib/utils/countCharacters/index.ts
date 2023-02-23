const EOL = "\n";

function countCharacters(text: string) {
  return text.split("").filter((n) => Boolean(n) && n !== EOL).length;
}

export { countCharacters };
