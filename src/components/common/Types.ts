

export interface ISongResults {
  id: string,
  name: string,
  artists: { name: string }[];
  album: {
    images: any; release_date: string,
  },
  // releaseDate: string,
  external_urls: { spotify: string },
}

export interface FormProps {
  getMoodyTunes: Function;
  updateMood: Function;
  setDecade: Function;
}

export interface ResultProps {
  key: string;
  id: string;
  artist: string;
  name: string;
  releaseDate: string;
  url: string,
  img: string;
  favoriteSongs: Array<ISongResults>;
  addFavorite: Function;
};

export interface FavoriteProps {
  key: string;
  id: string;
  artist: string;
  name: string;
  album?: Object; // Optional
  releaseDate?: string; // Optional
  url: string,
  img: string;
  favoriteSongs: Array<ISongResults>;
  removeFavorite: Function;
}

export interface FavoritesViewProps {
  favoriteSongs: ISongResults[]
  removeFavorite: Function;
}


export interface ResultsViewProps {
  songResults: ISongResults[];
  favoriteSongs: ISongResults[];
  addFavorite: Function;
  moodName: string;
}

export interface MoodData {
  mood: string;
  target_valence: number[];
  target_energy: number[];
  seed_genres: string[];
}