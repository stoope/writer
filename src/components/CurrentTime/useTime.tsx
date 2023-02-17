import { useEffect, useState } from "react";

function useTime() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (date === null) {
    return date;
  }

  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  });

  return time;
}

export { useTime };
