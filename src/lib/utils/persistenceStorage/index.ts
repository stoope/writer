type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

async function setItem(key: string, value: JSONValue) {
  if (import.meta.env.VITE_WEB) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    return window.ipcRenderer.invoke("setSetting", { key, value });
  }
}

async function getItem<T>(key: string): Promise<T | null> {
  if (import.meta.env.VITE_WEB) {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      /* empty */
    }
  } else {
    const item = await window.ipcRenderer.invoke("getSetting", { key });
    return item;
  }
  return null;
}

export { setItem, getItem };
