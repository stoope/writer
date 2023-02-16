import classnames from "classnames";
import { Courier_Prime } from "@next/font/google";
import styles from "./styles.module.css";
import { useEffect, useLayoutEffect, useRef } from "react";

const font = Courier_Prime({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  display: "swap",
});

type Props = {
  value: string;
  onChange(value: string): void;
  setSelectionStart(value: number): void;
  setSelectionEnd(value: number): void;
};

const SELECTION_START_KEY = "editor:selectionStart";
const SELECTION_END_KEY = "editor:selectionEnd";
const TEXT_KEY = "editor:value";
const SCROLL_KEY = "editor:scrollTop";

function Editor({
  value,
  onChange,
  setSelectionStart,
  setSelectionEnd,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    ref.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const preloadedText = window.localStorage.getItem(TEXT_KEY);
    if (preloadedText !== null) {
      onChange(preloadedText);
    }

    const selectionStart = window.localStorage.getItem(SELECTION_START_KEY);
    const selectionEnd = window.localStorage.getItem(SELECTION_END_KEY);
    const scrollTop = window.localStorage.getItem(SCROLL_KEY);

    setTimeout(() => {
      if (selectionStart !== null && selectionEnd !== null) {
        ref.current?.setSelectionRange(
          Number(selectionStart),
          Number(selectionEnd)
        );
      }
      if (scrollTop !== null && ref.current) {
        ref.current.scrollTop = Number(scrollTop);
      }
    }, 0);
  }, [onChange]);

  useEffect(() => {
    function handleSelection() {
      const selectionStart = ref.current?.selectionStart ?? 0;
      setSelectionStart(selectionStart);
      window.localStorage.setItem(SELECTION_START_KEY, String(selectionStart));

      const selectionEnd = ref.current?.selectionEnd ?? 0;
      setSelectionEnd(selectionEnd);
      window.localStorage.setItem(SELECTION_END_KEY, String(selectionEnd));
    }

    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [setSelectionEnd, setSelectionStart]);

  return (
    <textarea
      className={classnames(font.className, styles.textarea)}
      value={value}
      onChange={function (event) {
        onChange(event.target.value);
        window.localStorage.setItem(TEXT_KEY, event.target.value);
      }}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      ref={ref}
      onScroll={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          window.localStorage.setItem(
            SCROLL_KEY,
            String((event.target as HTMLTextAreaElement).scrollTop)
          );
        }
      }}
    ></textarea>
  );
}

export { Editor };
