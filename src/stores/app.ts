import { writable } from "svelte/store";
import { getItem, setItem } from "../utils/persistenceStorage";

const DARK_MODE_KEY = "app:darkMode";

export const darkMode = writable(true);

darkMode.subscribe(function (value) {
  if (value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

const _darkMode = getItem<boolean>(DARK_MODE_KEY);

if (_darkMode !== null) {
  darkMode.set(_darkMode);
}

export function toggle() {
  darkMode.update((value) => {
    setItem(DARK_MODE_KEY, !value);
    return !value;
  });
}
