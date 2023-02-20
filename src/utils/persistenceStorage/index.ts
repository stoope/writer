import Store from "electron-store";

const store = new Store();

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

function setItem(key: string, value: JSONValue) {
  store.set(key, value);
}

function getItem<T>(key: string): T | null {
  const item = store.get(key) as T;

  return item ?? null;
}

export { setItem, getItem };
