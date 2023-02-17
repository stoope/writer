import styles from "@/styles/Home.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { CurrentTime } from "../components/CurrentTime";
import { Editor } from "../components/Editor";
import { IconButton } from "../components/IconButton";
import { Statistics } from "../components/Statistics";
import { Stopwatch } from "../components/Stopwatch";
import { Clear } from "../icons/Clear";
import { Fullscreen } from "../icons/Fullscreen";
import { FullscreenExit } from "../icons/FullscreenExit";
import { Spellcheck } from "../icons/Spellcheck";
import { closeFullscreen, openFullscreen } from "../utils/fullscreen";
import { useLocalStorage } from "../utils/useLocalStorage";

const TEXT_KEY = "editor:value";
const SPELLCHECK_KEY = "editor:spellCheck";
const SELECTION_START_KEY = "editor:selectionStart";
const SELECTION_END_KEY = "editor:selectionEnd";
const SCROLL_KEY = "editor:scrollTop";

export default function Home() {
  const { value, setValue } = useLocalStorage(TEXT_KEY, "");
  const { value: spellCheck, setValue: setSpellCheck } = useLocalStorage(
    SPELLCHECK_KEY,
    ""
  );

  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const focusEditor = useCallback(() => {
    editorRef.current?.focus();
  }, []);

  useEffect(() => {
    focusEditor();

    const selectionStart = window.localStorage.getItem(SELECTION_START_KEY);
    const selectionEnd = window.localStorage.getItem(SELECTION_END_KEY);
    const scrollTop = window.localStorage.getItem(SCROLL_KEY);

    setTimeout(() => {
      if (selectionStart !== null && selectionEnd !== null) {
        editorRef.current?.setSelectionRange(
          Number(selectionStart),
          Number(selectionEnd)
        );
      }
      if (scrollTop !== null && editorRef.current) {
        editorRef.current.scrollTop = Number(scrollTop);
      }
    }, 0);
  }, []);

  const onScroll: React.UIEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      if (event.target instanceof HTMLTextAreaElement) {
        window.localStorage.setItem(
          SCROLL_KEY,
          String((event.target as HTMLTextAreaElement).scrollTop)
        );
      }
    },
    []
  );

  useEffect(() => {
    function handleSelection() {
      const selectionStart = editorRef.current?.selectionStart ?? 0;
      setSelectionStart(selectionStart);
      window.localStorage.setItem(SELECTION_START_KEY, String(selectionStart));

      const selectionEnd = editorRef.current?.selectionEnd ?? 0;
      setSelectionEnd(selectionEnd);
      window.localStorage.setItem(SELECTION_END_KEY, String(selectionEnd));
    }

    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [setSelectionEnd, setSelectionStart]);

  return (
    <main className={styles.container}>
      <div className={styles["action-bar"]}>
        <IconButton
          selected={Boolean(spellCheck)}
          icon={<Spellcheck />}
          onClick={() => {
            setSpellCheck(!spellCheck ? "true" : "");
            focusEditor();
          }}
        />
        <IconButton
          selected={fullscreen}
          icon={fullscreen ? <FullscreenExit /> : <Fullscreen />}
          onClick={() => {
            if (fullscreen) {
              closeFullscreen();
              setFullscreen(false);
            } else {
              openFullscreen();
              setFullscreen(true);
            }
            focusEditor();
          }}
        />
        <IconButton
          icon={<Clear />}
          onClick={() => {
            setValue("");
            focusEditor();
          }}
        />
      </div>
      <div className={styles.editor}>
        <Editor
          value={value}
          onChange={setValue}
          spellCheck={Boolean(spellCheck)}
          ref={editorRef}
          onScroll={onScroll}
        />
      </div>
      <div className={styles["status-bar"]}>
        <div className={styles["stopwatch"]}>
          <Stopwatch focusEditor={focusEditor} />
        </div>
        <CurrentTime />
        <div className={styles["statistics"]}>
          <Statistics
            text={value}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
          />
        </div>
      </div>
    </main>
  );
}
