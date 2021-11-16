import React from 'react';

import { enableFullscreen } from '../utils/fullscreen/enable-fullscreen';
import { exitFullscreen } from '../utils/fullscreen/exit-fullscreen';
import { getBrowserFullscreenElementProp } from '../utils/fullscreen/get-browser-fullscreen-element-prop';

type ReturnType = [isFullScreen: boolean, setFullScreen: (value: boolean) => void];

const useFullscreenStatus = (elementRef: React.RefObject<HTMLElement | null>): ReturnType => {
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(getBrowserFullscreenElementProp() !== null);

  const setFullscreen = (value: boolean): void => {
    value ? enableFullscreen(elementRef) : exitFullscreen(document);
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () => setIsFullscreen(getBrowserFullscreenElementProp() !== null);
  });

  return [isFullscreen, setFullscreen];
};

export default useFullscreenStatus;
