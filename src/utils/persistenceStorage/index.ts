type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

function setItem(key: string, value: JSONValue) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T>(key: string): T | null {
  const item = window.localStorage.getItem(key);

  if (item !== null) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      return null;
    }
  }

  return null;
}

export { setItem, getItem };
