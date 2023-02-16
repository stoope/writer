function countSentences(text: string) {
  return text.split(/[.!?]/).filter(Boolean).length;
}

export { countSentences };
