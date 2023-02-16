import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { CurrentTime } from "../components/CurrentTime";
import { Editor } from "../components/Editor";
import { Statistics } from "../components/Statistics";
import { useLocalStorage } from "../utils/useLocalStorage";

export default function Home() {
  const { value, setValue } = useLocalStorage("editor:value", "");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  return (
    <main className={styles.container}>
      <div className={styles.editor}>
        <Editor
          value={value}
          onChange={setValue}
          setSelectionStart={setSelectionStart}
          setSelectionEnd={setSelectionEnd}
        />
      </div>
      <div className={styles["status-bar"]}>
        <CurrentTime />
        <Statistics
          text={value}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
        />
      </div>
    </main>
  );
}
