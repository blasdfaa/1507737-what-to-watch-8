import React from 'react';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

import useFullscreenStatus from './use-fullscreen-status';

dayjs.extend(durationPlugin);

const SECONDS_IN_HOUR = 3600;

const getRemainingVideoTime = (current: number, duration: number): string => {
  const remainingTime = dayjs.duration(duration - current, 's');

  return duration > SECONDS_IN_HOUR ? remainingTime.format('HH:mm:ss') : remainingTime.format('mm:ss');
};

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
  const [currentVideoTime, setСurrentVideoTime] = React.useState<number>(0);

  const [isFullScreen, setFullScreen] = useFullscreenStatus(playerElementRef);

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

      setСurrentVideoTime(videoElement.currentTime);
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
