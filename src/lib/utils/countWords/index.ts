function countWords(text: string) {
  return text.split(/\s+\b/).filter(Boolean).length;
}

export { countWords };
