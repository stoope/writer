import { debounce } from "debounce";
import { writable, get } from "svelte/store";
import { setItem } from "../utils/persistenceStorage";

const VALUE_KEY = "editor:value";
const SELECTION_START_KEY = "editor:selectionStart";
const SELECTION_END_KEY = "editor:selectionEnd";
const SCROLL_KEY = "editor:scrollTop";

const setValue = debounce(function (value: string) {
  setItem(VALUE_KEY, value);
}, 300);

const setSelectionStart = debounce(function (value: number) {
  setItem(SELECTION_START_KEY, value);
}, 300);

const setSelectionEnd = debounce(function (value: number) {
  setItem(SELECTION_END_KEY, value);
}, 300);

const setScrollTop = debounce(function (value: number) {
  setItem(SCROLL_KEY, value);
}, 300);

export const ref = writable<HTMLTextAreaElement>();
export const value = writable("");
export const scrollTop = writable(0);
export const selectionStart = writable(0);
export const selectionEnd = writable(0);

value.subscribe(setValue);
scrollTop.subscribe(setScrollTop);
selectionStart.subscribe(setSelectionStart);
selectionEnd.subscribe(setSelectionEnd);

export function handleSelectionChange() {
  selectionStart.set(get(ref).selectionStart ?? 0);
  selectionEnd.set(get(ref).selectionEnd ?? 0);
}

export function focus() {
  get(ref).focus();
  get(ref).scrollTop = get(scrollTop);
}

window.ipcRenderer.invoke("initSettings").then((settings) => {
  const _selectionStart = settings[SELECTION_START_KEY];
  const _selectionEnd = settings[SELECTION_END_KEY];
  const _scrollTop = settings[SCROLL_KEY];
  const _value = settings[VALUE_KEY];

  if (_value !== null) {
    get(ref).value = _value;
    value.set(_value);
  }

  if (_selectionStart !== null && _selectionEnd !== null) {
    get(ref).setSelectionRange(_selectionStart, _selectionEnd);
  }

  if (_scrollTop !== null) {
    get(ref).scrollTop = _scrollTop;
  }
});
