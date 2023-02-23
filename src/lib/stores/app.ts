import { debounce } from "debounce";
import { writable, get } from "svelte/store";
import { setItem } from "../utils/persistenceStorage";

const THEME_KEY = "app:theme";

const setTheme = function (value: string) {
  setItem(THEME_KEY, value);
};

export const theme = writable<"light" | "dark" | "system">("system");
export const fullscreen = writable<boolean>(false);

theme.subscribe(setTheme);

window.ipcRenderer.invoke("initSettings").then((settings) => {
  const _theme = settings[THEME_KEY];
  const _fullscreen = settings.fullscreen;

  if (_theme !== null) {
    theme.set(_theme);
  }

  if (_fullscreen !== null) {
    fullscreen.set(_fullscreen);
  }
});
