import classNames from "classnames";
import styles from "./styles.module.css";
import { useTime } from "./useTime";

type Props = {
  className?: string;
};

function CurrentTime({ className }: Props) {
  const time = useTime();

  return (
    <div
      title="Current time"
      className={classNames(styles.container, className)}
    >
      {time}
    </div>
  );
}

export { CurrentTime };
