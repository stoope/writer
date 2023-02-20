import { debounce } from "debounce";
import { writable, get } from "svelte/store";
import { getItem, setItem } from "../utils/persistenceStorage";

const VALUE_KEY = "editor:value";
const SPELLCHECK_KEY = "editor:spellCheck";
const SELECTION_START_KEY = "editor:selectionStart";
const SELECTION_END_KEY = "editor:selectionEnd";
const SCROLL_KEY = "editor:scrollTop";

const setValue = debounce(function (value: string) {
  setItem(VALUE_KEY, value);
}, 300);

const setSpellcheck = debounce(function (value: boolean) {
  setItem(SPELLCHECK_KEY, value);
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
export const spellcheck = writable(false);
export const scrollTop = writable(0);
export const selectionStart = writable(0);
export const selectionEnd = writable(0);

value.subscribe(setValue);
spellcheck.subscribe(setSpellcheck);
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

export function init() {
  focus();

  const _selectionStart = getItem<number>(SELECTION_START_KEY);
  const _selectionEnd = getItem<number>(SELECTION_END_KEY);
  const _scrollTop = getItem<number>(SCROLL_KEY);
  const _value = getItem<string>(VALUE_KEY);
  const _spellCheck = getItem<boolean>(SPELLCHECK_KEY);

  if (_value !== null) {
    get(ref).value = _value;
    value.set(_value);
  }

  if (_spellCheck !== null) {
    spellcheck.set(_spellCheck);
  }

  if (_selectionStart !== null && _selectionEnd !== null) {
    get(ref).setSelectionRange(_selectionStart, _selectionEnd);
  }

  if (_scrollTop !== null) {
    get(ref).scrollTop = _scrollTop;
  }
}