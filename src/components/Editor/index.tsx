import classnames from "classnames";
import { Courier_Prime } from "@next/font/google";
import styles from "./styles.module.css";
import { forwardRef } from "react";

const font = Courier_Prime({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  display: "swap",
});

type Props = {
  value: string;
  spellCheck?: boolean;
  className?: string;
  onChange(value: string): void;
  onScroll: React.UIEventHandler<HTMLTextAreaElement>;
};

const Editor = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, spellCheck = false, onChange, onScroll, className }, ref) => {
    return (
      <textarea
        className={classnames(font.className, styles.textarea, className)}
        value={value}
        onChange={function (event) {
          onChange(event.target.value);
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={spellCheck}
        ref={ref}
        onScroll={onScroll}
      ></textarea>
    );
  }
);

Editor.displayName = "Editor";

export { Editor };
