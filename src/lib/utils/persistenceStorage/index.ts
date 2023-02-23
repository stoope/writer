type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

async function setItem(key: string, value: JSONValue) {
  return window.ipcRenderer.invoke("setSetting", { key, value });
}

export { setItem };
