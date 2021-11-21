import React from 'react';

import { getRemainingVideoTime } from '../utils/dates/date';
import useFullscreenStatus from './use-fullscreen-status';

type ReturnType = {
  isPlaying: boolean;
  timeProgress: number;
  remainingVideoTime: string;
  togglePlay: () => void;
  toggleFullscreen: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useVideoPlayer = (
  playerElementRef: React.RefObject<HTMLDivElement | null>,
  videoElementRef: React.RefObject<HTMLVideoElement | null>,
  progressElementRef: React.RefObject<HTMLInputElement | null>,
): ReturnType => {
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  const [timeProgress, setTimeProgress] = React.useState<number>(0);
  const [videoTime, setVideoTime] = React.useState<number>(0);
  const [currentVideoTime, setCurrentVideoTime] = React.useState<number>(0);

  const [isFullScreen, setFullScreen] = useFullscreenStatus(playerElementRef);

  React.useEffect(() => {
    // Каждые 500мс проверяем состояние готовности видео, если больше 0, то есть есть как минимум метаданные - можно
    // устанавливать длительность.
    const timer = setInterval(() => {
      if (videoElementRef.current !== null) {
        if (videoElementRef.current.readyState > 0) {
          const duration = videoElementRef.current.duration;

          setVideoTime(duration);
          clearInterval(timer);
        }
      }
    }, 500);
  }, []);

  React.useEffect(() => {
    if (videoElementRef.current !== null) {
      isPlaying ? videoElementRef.current.play() : videoElementRef.current.pause();
    }
  }, [videoElementRef, isPlaying]);

  const togglePlay = (): void => {
    if (videoElementRef.current !== null) {
      setVideoTime(videoElementRef.current.duration);
      setPlaying((prevState) => !prevState);
    }
  };

  const toggleFullscreen = (): void => {
    setFullScreen(!isFullScreen);
  };

  const handleOnTimeUpdate = (): void => {
    if (videoElementRef.current !== null && progressElementRef.current !== null) {
      const videoElement = videoElementRef.current;
      const progressElement = progressElementRef.current;
      const progress = (videoElement.currentTime / videoTime) * 100;

      progressElement.style.backgroundSize = `${progress}% 100%`;

      setCurrentVideoTime(videoElement.currentTime);
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

  const remainingVideoTime = getRemainingVideoTime(currentVideoTime, videoTime);

  return {
    isPlaying,
    timeProgress,
    remainingVideoTime,
    togglePlay,
    toggleFullscreen,
    handleOnTimeUpdate,
    handleVideoProgress,
  };
};

export default useVideoPlayer;
