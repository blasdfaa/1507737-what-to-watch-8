import React from 'react';
import { useHistory, useParams } from 'react-router';

import { ApiDataStatus } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import useVideoPlayer from '../../hooks/use-video-player';
import { fetchMovieById } from '../../redux/movie/movie.async';
import { getOneMovieLoadingStatus, oneMovieSelector } from '../../redux/movie/movie.selector';

type UseParams = {
  id: string;
};

function PlayerPage(): JSX.Element {
  const { id: movieId } = useParams<UseParams>();
  const history = useHistory();
  const dispatch = useTypedDispatch();

  const movie = useTypedSelector(oneMovieSelector);
  const movieLoadingStatus = useTypedSelector(getOneMovieLoadingStatus);

  const playerRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const controlRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    dispatch(fetchMovieById(+movieId));
  }, [dispatch, movieId]);

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

  const isSourceLoading = movieLoadingStatus === ApiDataStatus.Loading;
  const isSourceLoaded = movieLoadingStatus === ApiDataStatus.Idle;

  return (
    <div className={`player ${isSourceLoading ? 'player--source-loading' : ''}`} ref={playerRef}>
      {isSourceLoading && (
        <svg className="player__preloader" viewBox="0 0 19 20" width="70" height="70">
          <use xlinkHref="#btn-loader" />
        </svg>
      )}
      <video
        className="player__video"
        ref={videoRef}
        poster={movie?.posterImage}
        onTimeUpdate={handleOnTimeUpdate}
      >
        {isSourceLoaded && <source src={movie?.videoLink} />}
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
          <button type="button" className="player__play" onClick={togglePlay} disabled={!!isSourceLoading}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying && <use xlinkHref="#pause"></use>}
              {!isPlaying && <use xlinkHref="#play-s"></use>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie && movie.title}</div>

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
