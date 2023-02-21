import { debounce } from "debounce";
import { writable, get } from "svelte/store";
import { setItem } from "../utils/persistenceStorage";

const THEME_KEY = "app:theme";

const setTheme = debounce(function (value: string) {
  setItem(THEME_KEY, value);
}, 300);

export const theme = writable<"light" | "dark" | "system">("system");

theme.subscribe(setTheme);

window.ipcRenderer.invoke("initSettings").then((settings) => {
  const _theme = settings[THEME_KEY];

  if (_theme !== null) {
    theme.set(_theme);
  }
});
