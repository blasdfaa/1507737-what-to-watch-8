import React from 'react';

import useFullscreenStatus from './use-fullscreen-status';

type ReturnType = [
  isPlaying: boolean,
  timeProgress: number,
  togglePlay: () => void,
  toggleFullscreen: () => void,
  handleOnTimeUpdate: () => void,
  handleVideoProgress: (e: React.ChangeEvent<HTMLInputElement>) => void,
];

const useVideoPlayer = (
  playerElementRef: React.RefObject<HTMLDivElement | null>,
  videoElementRef: React.RefObject<HTMLVideoElement | null>,
  progressElementRef: React.RefObject<HTMLInputElement | null>,
): ReturnType => {
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  const [timeProgress, setTimeProgress] = React.useState<number>(0);

  const [isFullScreen, setFullScreen] = useFullscreenStatus(playerElementRef);

  React.useEffect(() => {
    isPlaying ? videoElementRef.current?.play() : videoElementRef.current?.pause();
  }, [videoElementRef, isPlaying]);

  const togglePlay = (): void => {
    setPlaying((prevState) => !prevState);
  };

  const toggleFullscreen = (): void => {
    setFullScreen(!isFullScreen);
  };

  const handleOnTimeUpdate = (): void => {
    if (videoElementRef.current !== null && progressElementRef.current !== null) {
      const videoElement = videoElementRef.current;
      const progressElement = progressElementRef.current;
      const progress = (videoElement?.currentTime / videoElement?.duration) * 100;

      progressElement.style.backgroundSize = `${progress}% 100%`;

      setTimeProgress(progress);
    }
  };

  const handleVideoProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (videoElementRef.current !== null) {
      const videoElement = videoElementRef.current;
      const progressElement = e.target;
      const manualChange = progressElement.valueAsNumber;
      const min = +e.target.min;
      const max = +e.target.max;

      videoElement.currentTime = (videoElementRef.current.duration / 100) * manualChange;
      progressElement.style.backgroundSize = `${((manualChange - min) * 100) / (max - min)}% 100%`;

      setTimeProgress(manualChange);
    }
  };

  return [isPlaying, timeProgress, togglePlay, toggleFullscreen, handleOnTimeUpdate, handleVideoProgress];
};

export default useVideoPlayer;
