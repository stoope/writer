import { useCallback, useContext } from "react";
import { IconButton } from "../IconButton";
import { editorContext } from "../../stores/editor";
import { Clear } from "../../icons/Clear";

function ClearEditor() {
  const { setValue, focus } = useContext(editorContext);

  const clear = useCallback(() => {
    setValue("");
    focus();
  }, [focus, setValue]);

  return <IconButton icon={<Clear />} onClick={clear} title="Clear editor" />;
}

export { ClearEditor };
