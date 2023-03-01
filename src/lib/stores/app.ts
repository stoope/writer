import { writable } from "svelte/store";
import { setItem, getItem } from "../utils/persistenceStorage";

const THEME_KEY = "app:theme";

type Theme = "light" | "dark" | "system";

const setTheme = function (value: Theme) {
  setItem(THEME_KEY, value);
  switchThemeInApp(value);
};

export const theme = writable<Theme>("system");
export const fullscreen = writable<boolean>(false);

export function switchThemeInApp(value: Theme) {
  if (import.meta.env.VITE_WEB) {
    document.body.classList.remove("light-theme");
    document.body.classList.remove("dark-theme");
    if (value === "light") {
      document.body.classList.add("light-theme");
    } else if (value === "dark") {
      document.body.classList.add("dark-theme");
    }
  }
}

getItem<Theme>(THEME_KEY).then(function (_theme) {
  _theme = _theme ?? "system";

  theme.set(_theme ?? "system");

  switchThemeInApp(_theme);

  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      html,
      html *,
      html *:before,
      html *:after {
        transition: color 100ms, background-color 100ms, opacity 100ms;
      }
    </style>`
  );

  theme.subscribe(setTheme);
});
