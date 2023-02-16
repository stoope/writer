import classnames from "classnames";
import { Courier_Prime } from "@next/font/google";
import styles from "./styles.module.css";
import { useMemo } from "react";
import { countCharacters } from "../../utils/countCharacters";
import { countWords } from "../../utils/countWords";
import { countParagraphs } from "../../utils/countParagraphs";
import { countSentences } from "../../utils/countSentences";

type Props = {
  text: string;
};

function Statistics({ text }: Props) {
  const { characters, words, sentences, paragraphs } = useMemo(() => {
    const characters = countCharacters(text);
    const words = countWords(text);
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);

    return { characters, words, sentences, paragraphs };
  }, [text]);

  return (
    <div className={styles.container}>
      <span>{characters}C</span> <span>{words}W</span> <span>{sentences}S</span>{" "}
      <span>{paragraphs}P</span>{" "}
    </div>
  );
}

export { Statistics };
