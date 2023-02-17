import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useRef,
} from "react";

const editorRefContext = createContext<
  MutableRefObject<HTMLTextAreaElement | null>
>({ current: null });

function EditorRefContext({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <editorRefContext.Provider value={ref}>
      {children}
    </editorRefContext.Provider>
  );
}

export { editorRefContext, EditorRefContext };
