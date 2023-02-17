import styles from "./styles.module.css";
import { useMemo } from "react";
import classnames from "classnames";
import { useDebounce } from "use-debounce";
import { countCharacters } from "../../utils/countCharacters";
import { countWords } from "../../utils/countWords";
import { countParagraphs } from "../../utils/countParagraphs";
import { countSentences } from "../../utils/countSentences";
import { calculatePosition } from "../../utils/calculatePosition";

type Props = {
  text: string;
  selectionStart: number;
  selectionEnd: number;
  className?: string;
};

function Statistics({ className, text, selectionStart, selectionEnd }: Props) {
  const [debouncedText] = useDebounce(text, 100);

  const { characters, words, sentences, paragraphs, position } = useMemo(() => {
    let selectedText = debouncedText;

    if (selectionStart !== selectionEnd) {
      selectedText = selectedText.substring(selectionStart, selectionEnd);
    }

    const characters = countCharacters(selectedText);
    const words = countWords(selectedText);
    const sentences = countSentences(selectedText);
    const paragraphs = countParagraphs(selectedText);
    const position = calculatePosition(debouncedText, selectionEnd);

    return { characters, words, sentences, paragraphs, position };
  }, [selectionEnd, selectionStart, debouncedText]);

  return (
    <span className={classnames(styles.container, className)}>
      {selectionStart !== selectionEnd && (
        <span className={styles["selection-range"]} title="Selected range">
          [{selectionStart},{selectionEnd}]
        </span>
      )}{" "}
      <span title="Character count">{characters}C</span>{" "}
      <span title="Words count">{words}W</span>{" "}
      <span title="Sentences count">{sentences}S</span>{" "}
      <span title="Paragraphs count">{paragraphs}P</span>{" "}
      <span title="Cursor position" className={styles.position}>
        {position.toFixed(2).padStart(6, " ")}%
      </span>{" "}
    </span>
  );
}

export { Statistics };
