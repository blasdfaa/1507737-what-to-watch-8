import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

const SECONDS_IN_HOUR = 3600;

export const getMovieRuntime = (time: number): string => dayjs.duration(time, 'minutes').format('H[h] mm[m]');

export const getRemainingVideoTime = (current: number, duration: number): string => {
  const remainingTime = dayjs.duration(duration - current, 's');

  return duration > SECONDS_IN_HOUR ? remainingTime.format('HH:mm:ss') : remainingTime.format('mm:ss');
};
