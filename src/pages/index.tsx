import styles from "@/styles/Home.module.css";
import { Editor } from "../components/Editor";
import { Statistics } from "../components/Statistics";
import { useLocalStorage } from "../utils/useLocalStorage";

export default function Home() {
  const { value, setValue } = useLocalStorage("editor:value", "");

  return (
    <main className={styles.container}>
      <div className={styles.editor}>
        <Editor value={value} onChange={setValue} />
      </div>
      <div className={styles["bottom-bar"]}>
        <Statistics text={value} />
      </div>
    </main>
  );
}
