import styles from "@/styles/Home.module.css";
import { CurrentTime } from "../components/CurrentTime";
import { Editor } from "../components/Editor";
import { Fullscreen } from "../components/Fullscreen";
import { Statistics } from "../components/Statistics";
import { Stopwatch } from "../components/Stopwatch";
import { EditorRefContext } from "../stores/editorRef";
import { EditorContext } from "../stores/editor";
import { ClearEditor } from "../components/ClearEditor";
import { Spellcheck } from "../components/Spellcheck";

export default function Home() {
  return (
    <EditorRefContext>
      <EditorContext>
        <main className={styles.container}>
          <div className={styles["topbar"]}>
            <Spellcheck />
            <Fullscreen />
            <ClearEditor />
          </div>
          <Editor className={styles.editor} />
          <Stopwatch className={styles["stopwatch"]} />
          <CurrentTime className={styles["time"]} />
          <Statistics className={styles["statistics"]} />
        </main>
      </EditorContext>
    </EditorRefContext>
  );
}
