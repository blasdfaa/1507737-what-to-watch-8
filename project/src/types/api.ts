export type ApiMovieData = {
  id: number;
  name: string;
  'poster_image': string;
  'preview_image': string;
  'background_image': string;
  'background_color': string;
  'video_link': string;
  'preview_video_link': string;
  description: string;
  rating: number;
  'scores_count': number;
  director: string;
  starring: string[];
  'run_time': number;
  genre: string;
  released: number;
  'is_favorite': boolean;
};

export type ApiUserInfo = {
  id: number;
  email: string;
  name: string;
  'avatar_url': string;
  token: string;
};
