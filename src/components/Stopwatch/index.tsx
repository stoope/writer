import { useStopwatch } from "react-use-precision-timer";
import classnames from "classnames";
import { IconButton } from "../IconButton";
import styles from "./styles.module.css";
import { Reset } from "../../icons/Reset";
import { Start } from "../../icons/Start";
import { Pause } from "../../icons/Pause";
import { useEffect, useState } from "react";

function parseTime(duration: number) {
  const milliseconds = Math.floor(duration % 1000);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return { hours, minutes, seconds, milliseconds };
}

type Props = {
  focusEditor(): void;
};

function Stopwatch({ focusEditor }: Props) {
  const [renderTime, setRenderTime] = useState(new Date().getTime());

  useEffect(() => {
    const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
    return () => {
      clearTimeout(timeout);
    };
  });

  const {
    isRunning,
    resume,
    pause,
    stop,
    start,
    getElapsedRunningTime,
    isStarted,
  } = useStopwatch();

  const { hours, minutes, seconds, milliseconds } = parseTime(
    getElapsedRunningTime()
  );

  return (
    <div title="Current time" className={styles.container}>
      <span className={classnames(isRunning() && styles.running)}>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}:
        {String(milliseconds).padStart(3, "0")}
      </span>{" "}
      {isRunning() ? (
        <IconButton
          selected={isRunning()}
          icon={<Pause width={24} height={24} />}
          onClick={() => {
            pause();
            focusEditor();
          }}
        />
      ) : (
        <IconButton
          selected={isRunning()}
          icon={<Start width={24} height={24} />}
          onClick={() => {
            if (isStarted()) {
              resume();
            } else {
              start();
            }
            focusEditor();
          }}
        />
      )}
      <IconButton
        selected={isRunning()}
        icon={<Reset width={24} height={24} />}
        onClick={() => {
          stop();
          focusEditor();
        }}
      />
    </div>
  );
}

export { Stopwatch };
