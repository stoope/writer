import { useCallback, useContext, useState } from "react";
import { FullscreenExit } from "../../icons/FullscreenExit";
import { Fullscreen as FullscreenIcon } from "../../icons/Fullscreen";
import { IconButton } from "../IconButton";
import { closeFullscreen, openFullscreen } from "../../utils/fullscreen";
import { editorContext } from "../../stores/editor";

function Fullscreen() {
  const [fullscreen, setFullscreen] = useState(false);
  const { focus } = useContext(editorContext);

  const toggle = useCallback(() => {
    if (fullscreen) {
      try {
        closeFullscreen();
        setFullscreen(false);
      } catch (error) {}
    } else {
      try {
        openFullscreen();
        setFullscreen(true);
      } catch (error) {}
    }
    focus();
  }, [focus, fullscreen]);

  return (
    <IconButton
      selected={fullscreen}
      icon={fullscreen ? <FullscreenExit /> : <FullscreenIcon />}
      onClick={toggle}
    />
  );
}

export { Fullscreen };
