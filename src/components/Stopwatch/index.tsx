import { useStopwatch } from "react-use-precision-timer";
import classnames from "classnames";
import { IconButton } from "../IconButton";
import styles from "./styles.module.css";
import { Reset } from "../../icons/Reset";
import { Start } from "../../icons/Start";
import { Pause } from "../../icons/Pause";
import { useContext, useEffect, useState } from "react";
import { editorContext } from "../../stores/editor";

function parseTime(duration: number) {
  const milliseconds = Math.floor(duration % 1000);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return { hours, minutes, seconds, milliseconds };
}

type Props = {
  className?: string;
};

function Stopwatch({ className }: Props) {
  const { focus } = useContext(editorContext);
  const [, setRenderTime] = useState(new Date().getTime());

  const {
    isRunning,
    resume,
    pause,
    stop,
    start,
    getElapsedRunningTime,
    isStarted,
  } = useStopwatch();

  useEffect(() => {
    if (isRunning()) {
      const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

  const { hours, minutes, seconds, milliseconds } = parseTime(
    getElapsedRunningTime()
  );

  return (
    <div
      title="Current time"
      className={classnames(styles.container, className)}
    >
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
            focus();
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
            focus();
          }}
        />
      )}
      <IconButton
        selected={isRunning()}
        icon={<Reset width={24} height={24} />}
        onClick={() => {
          stop();
          focus();
        }}
      />
    </div>
  );
}

export { Stopwatch };
