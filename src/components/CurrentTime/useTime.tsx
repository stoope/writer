import { useEffect, useState } from "react";

function useTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  });

  return time;
}

export { useTime };
