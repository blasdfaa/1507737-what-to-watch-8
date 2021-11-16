export const enableFullscreen = (ref: React.RefObject<HTMLElement | null>): void => {
  if (ref.current !== null) {
    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen();
    } else if (ref.current.mozRequestFullScreen) {
      ref.current.mozRequestFullScreen();
    } else if (ref.current.webkitRequestFullscreen) {
      ref.current.webkitRequestFullscreen();
    } else if (ref.current.msRequestFullscreen) {
      ref.current.msRequestFullscreen();
    }
  }
};
