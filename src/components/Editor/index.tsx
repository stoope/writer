import classnames from "classnames";
import { Courier_Prime } from "@next/font/google";
import styles from "./styles.module.css";

const font = Courier_Prime({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  display: "swap",
});

type Props = {
  value: string;
  onChange(value: string): void;
};

function Editor({ value, onChange }: Props) {
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
    ></textarea>
  );
}

export { Editor };
