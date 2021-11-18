import React from 'react';
import { useHistory } from 'react-router';

import useVideoPlayer from '../../hooks/use-video-player';

type RouteStateType = {
  videoSource: string;
  videoPoster: string;
  videoName: string;
};

function PlayerPage(): JSX.Element {
  const history = useHistory();

  const playerRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const controlRef = React.useRef<HTMLInputElement | null>(null);

  const { videoSource, videoPoster, videoName } = history.location.state as RouteStateType;

  const {
    isPlaying,
    timeProgress,
    remainingVideoTime,
    togglePlay,
    toggleFullscreen,
    handleOnTimeUpdate,
    handleVideoProgress,
  } = useVideoPlayer(playerRef, videoRef, controlRef);

  const handleExitPlayer = (): void => {
    history.goBack();
  };

  return (
    <div className="player" ref={playerRef}>
      <video className="player__video" ref={videoRef} poster={videoPoster} onTimeUpdate={handleOnTimeUpdate}>
        <source src={videoSource} />
      </video>

      <button type="button" className="player__exit" onClick={handleExitPlayer}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <div className="player__progress-container">
              <input
                ref={controlRef}
                className="player__progress"
                type="range"
                name="progress"
                id="time-progress"
                min="0"
                max="100"
                step="0.01"
                value={timeProgress}
                onChange={(e) => handleVideoProgress(e)}
              />
            </div>
          </div>
          <div className="player__time-value">{remainingVideoTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19" onClick={togglePlay}>
              {isPlaying && <use xlinkHref="#pause"></use>}
              {!isPlaying && <use xlinkHref="#play-s"></use>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{videoName}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
