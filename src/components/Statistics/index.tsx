import styles from "./styles.module.css";
import { useContext, useMemo } from "react";
import classnames from "classnames";
import { countCharacters } from "../../utils/countCharacters";
import { countWords } from "../../utils/countWords";
import { countParagraphs } from "../../utils/countParagraphs";
import { countSentences } from "../../utils/countSentences";
import { calculatePosition } from "../../utils/calculatePosition";
import { editorContext } from "../../stores/editor";

type Props = {
  className?: string;
};

function Statistics({ className }: Props) {
  const { value, selectionStart, selectionEnd } = useContext(editorContext);

  const { characters, words, sentences, paragraphs, position } = useMemo(() => {
    let selectedValue = value;

    if (selectionStart !== selectionEnd) {
      selectedValue = selectedValue.substring(selectionStart, selectionEnd);
    }

    const characters = countCharacters(selectedValue);
    const words = countWords(selectedValue);
    const sentences = countSentences(selectedValue);
    const paragraphs = countParagraphs(selectedValue);
    const position = calculatePosition(value, selectionEnd);

    return { characters, words, sentences, paragraphs, position };
  }, [selectionEnd, selectionStart, value]);

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
