import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (item !== null) {
      return setStoredValue(item);
    }
  }, [key]);

  const setValue = useCallback(
    (value: string) => {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    },
    [key]
  );

  return { value: storedValue, setValue };
}

export { useLocalStorage };
