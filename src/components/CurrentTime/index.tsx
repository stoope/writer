import styles from "./styles.module.css";
import { useTime } from "./useTime";

function CurrentTime() {
  const time = useTime();

  return (
    <div title="Current time" className={styles.container}>
      {time}
    </div>
  );
}

export { CurrentTime };
