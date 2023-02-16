function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if ((document.documentElement as any).webkitRequestFullscreen) {
    /* Safari */
    (document.documentElement as any).webkitRequestFullscreen();
  } else if ((document.documentElement as any).msRequestFullscreen) {
    /* IE11 */
    (document.documentElement as any).msRequestFullscreen();
  }
}

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
