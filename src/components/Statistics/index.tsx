import styles from "./styles.module.css";
import { useMemo } from "react";
import { countCharacters } from "../../utils/countCharacters";
import { countWords } from "../../utils/countWords";
import { countParagraphs } from "../../utils/countParagraphs";
import { countSentences } from "../../utils/countSentences";
import { calculatePosition } from "../../utils/calculatePosition";

type Props = {
  text: string;
  selectionStart: number;
  selectionEnd: number;
};

function Statistics({ text, selectionStart, selectionEnd }: Props) {
  const { characters, words, sentences, paragraphs, position } = useMemo(() => {
    let selectedText = text;

    if (selectionStart !== selectionEnd) {
      selectedText = selectedText.substring(selectionStart, selectionEnd);
    }

    const characters = countCharacters(selectedText);
    const words = countWords(selectedText);
    const sentences = countSentences(selectedText);
    const paragraphs = countParagraphs(selectedText);
    const position = calculatePosition(text, selectionEnd);

    return { characters, words, sentences, paragraphs, position };
  }, [selectionEnd, selectionStart, text]);

  return (
    <div className={styles.container}>
      {selectionStart !== selectionEnd && (
        <span className={styles["selection-range"]} title="Selected range">
          [{selectionStart},{selectionEnd}]
        </span>
      )}{" "}
      <span title="Character count">{characters}C</span>{" "}
      <span title="Words count">{words}W</span>{" "}
      <span title="Sentences count">{sentences}S</span>{" "}
      <span title="Paragraphs count">{paragraphs}P</span>{" "}
      <span title="Cursor position">{position.toFixed(2)}%</span>{" "}
    </div>
  );
}

export { Statistics };
