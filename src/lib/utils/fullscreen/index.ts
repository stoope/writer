/* eslint-disable @typescript-eslint/no-explicit-any */

function openFullscreen() {
  const documentElement = document.documentElement;

  if (documentElement.requestFullscreen) {
    documentElement.requestFullscreen();
  } else if ((documentElement as any).webkitRequestFullscreen) {
    /* Safari */
    (documentElement as any).webkitRequestFullscreen();
  } else if ((documentElement as any).msRequestFullscreen) {
    /* IE11 */
    (documentElement as any).msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    /* Safari */
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    /* IE11 */
    (document as any).msExitFullscreen();
  }
}

export { openFullscreen, closeFullscreen };
