import { useCallback, useContext } from "react";
import { IconButton } from "../IconButton";
import { editorContext } from "../../stores/editor";
import { Spellcheck as SpellcheckIcon } from "../../icons/Spellcheck";

function Spellcheck() {
  const { spellCheck, setSpellCheck, focus } = useContext(editorContext);

  const toggle = useCallback(() => {
    setSpellCheck(!spellCheck);
    focus();
  }, [focus, setSpellCheck, spellCheck]);

  return (
    <IconButton
      selected={spellCheck}
      icon={<SpellcheckIcon />}
      onClick={toggle}
      title={spellCheck ? "Disable spellcheck" : "Enable spellcheck"}
    />
  );
}

export { Spellcheck };
