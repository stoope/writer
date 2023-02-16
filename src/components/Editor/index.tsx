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

  useEffect(() => {
    function handleSelection() {
      setSelectionStart(ref.current?.selectionStart ?? 0);
      setSelectionEnd(ref.current?.selectionEnd ?? 0);
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
      }}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      ref={ref}
    ></textarea>
  );
}

export { Editor };
