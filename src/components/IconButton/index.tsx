import styles from "./styles.module.css";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import classnames from "classnames";

type Props = {
  icon?: ReactNode;
  selected?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

function IconButton({ icon, className, selected = false, ...rest }: Props) {
  return (
    <button
      className={classnames(
        styles.container,
        selected && styles.selected,
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}

export { IconButton };
