import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { CurrentTime } from "../components/CurrentTime";
import { Editor } from "../components/Editor";
import { IconButton } from "../components/IconButton";
import { Statistics } from "../components/Statistics";
import { Clear } from "../icons/Clear";
import { Spellcheck } from "../icons/Spellcheck";
import { useLocalStorage } from "../utils/useLocalStorage";

const TEXT_KEY = "editor:value";
const SPELLCHECK_KEY = "editor:spellCheck";

export default function Home() {
  const { value, setValue } = useLocalStorage(TEXT_KEY, "");
  const { value: spellCheck, setValue: setSpellCheck } = useLocalStorage(
    SPELLCHECK_KEY,
    ""
  );

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  return (
    <main className={styles.container}>
      <div className={styles["action-bar"]}>
        <IconButton
          selected={Boolean(spellCheck)}
          icon={<Spellcheck />}
          onClick={() => {
            setSpellCheck(!spellCheck ? "true" : "");
          }}
        />
        <IconButton
          icon={<Clear />}
          onClick={() => {
            setValue("");
          }}
        />
      </div>
      <div className={styles.editor}>
        <Editor
          value={value}
          onChange={setValue}
          setSelectionStart={setSelectionStart}
          setSelectionEnd={setSelectionEnd}
          spellCheck={Boolean(spellCheck)}
        />
      </div>
      <div className={styles["status-bar"]}>
        <div className={styles["time"]}>
          <CurrentTime />
        </div>
        <Statistics
          text={value}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
        />
      </div>
    </main>
  );
}
