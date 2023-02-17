import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { editorRefContext } from "../editorRef";
import { getItem, setItem } from "../persistence";
import debounce from "debounce";

export const VALUE_KEY = "editor:value";
export const SPELLCHECK_KEY = "editor:spellCheck";
export const SELECTION_START_KEY = "editor:selectionStart";
export const SELECTION_END_KEY = "editor:selectionEnd";
export const SCROLL_KEY = "editor:scrollTop";

type EditorContextProps = {
  value: string;
  spellCheck: boolean;
  selectionStart: number;
  selectionEnd: number;
  setSpellCheck(value: boolean): void;
  setValue(value: string): void;
  setScrollTop(value: number): void;
  focus(): void;
};
const editorContext = createContext<EditorContextProps>({
  value: "",
  spellCheck: false,
  selectionStart: 0,
  selectionEnd: 0,
} as EditorContextProps);

const setValueToDB = debounce(function (value: string) {
  setItem(VALUE_KEY, value);
}, 300);

const setSpellcheckToDB = debounce(function (value: boolean) {
  setItem(SPELLCHECK_KEY, value);
}, 300);

const setSelectionStartToDB = debounce(function (value: number) {
  setItem(SELECTION_START_KEY, value);
}, 300);

const setSelectionEndToDB = debounce(function (value: number) {
  setItem(SELECTION_END_KEY, value);
}, 300);

const setScrollTopToDB = debounce(function (value: number) {
  setItem(SCROLL_KEY, value);
}, 300);

function EditorContext({ children }: PropsWithChildren<{}>) {
  const ref = useContext(editorRefContext);
  const [value, _setValue] = useState("");
  const [spellCheck, _setSpellCheck] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, [ref]);

  const setScrollTop = useCallback((value: number) => {
    setScrollTopToDB(value);
  }, []);

  const setValue = useCallback((value: string) => {
    _setValue(value);
    setValueToDB(value);
  }, []);

  const setSpellCheck = useCallback((value: boolean) => {
    _setSpellCheck(value);
    setSpellcheckToDB(value);
  }, []);

  useEffect(() => {
    focus();
  }, [focus]);

  useEffect(() => {
    function handleSelection() {
      const selectionStart = ref.current?.selectionStart ?? 0;
      setSelectionStart(selectionStart);
      setSelectionStartToDB(selectionStart);

      const selectionEnd = ref.current?.selectionEnd ?? 0;
      setSelectionEnd(selectionEnd);
      setSelectionEndToDB(selectionEnd);
    }

    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [ref]);

  useEffect(() => {
    const selectionStart = getItem<number>(SELECTION_START_KEY);
    const selectionEnd = getItem<number>(SELECTION_END_KEY);
    const scrollTop = getItem<number>(SCROLL_KEY);
    const value = getItem<string>(VALUE_KEY);
    const spellCheck = getItem<boolean>(SPELLCHECK_KEY);

    if (value !== null) {
      _setValue(value);
    }

    if (spellCheck !== null) {
      setSpellCheck(spellCheck);
    }

    setTimeout(() => {
      if (selectionStart !== null && selectionEnd !== null) {
        ref.current?.setSelectionRange(selectionStart, selectionEnd);
      }

      if (scrollTop !== null && ref.current) {
        ref.current.scrollTop = scrollTop;
      }
    }, 100);
  }, [ref, setSpellCheck]);

  return (
    <editorContext.Provider
      value={{
        focus,
        value,
        setValue,
        spellCheck,
        setSpellCheck,
        setScrollTop,
        selectionStart,
        selectionEnd,
      }}
    >
      {children}
    </editorContext.Provider>
  );
}

export { EditorContext, editorContext };
