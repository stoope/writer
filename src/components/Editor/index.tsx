import classnames from "classnames";
import { Courier_Prime } from "@next/font/google";
import styles from "./styles.module.css";
import { useContext } from "react";
import { editorRefContext } from "../../stores/editorRef";
import { editorContext } from "../../stores/editor";

const font = Courier_Prime({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  display: "swap",
});

type Props = {
  className?: string;
};

function Editor({ className }: Props) {
  const ref = useContext(editorRefContext);
  const { value, spellCheck, setValue, setScrollTop } =
    useContext(editorContext);

  return (
    <textarea
      className={classnames(font.className, styles.textarea, className)}
      value={value}
      onChange={function (event) {
        setValue(event.target.value);
      }}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={spellCheck}
      ref={ref}
      onScroll={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          setScrollTop((event.target as HTMLTextAreaElement).scrollTop);
        }
      }}
    ></textarea>
  );
}

export { Editor };
