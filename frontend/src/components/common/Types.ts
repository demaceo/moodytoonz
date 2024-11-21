

export interface ISongResults {
  id: string,
  name: string,
  artists: Array<{ name: string }>,
  album: { release_date: string },
  releaseDate: string,
  // genre: string
}

export interface FormProps {
  getMoodyTunes: Function;
  updateMood: Function;
  // getGenres: Function;
}

export interface ResultProps {
  key: string;
  id: string;
  artist: string;
  name: string;
  // album: Object,
  releaseDate: string;
  // genre: string;
  favoriteSongs: Array<ISongResults>;
  addFavorite: Function;
};

// export interface FavoriteProps {
//   key: string;
//   id: string;
//   artist: string;
//   name: string;
//   // album: Object,
//   releaseDate: string;
//   // genre: string;
//   favoriteSongs: Array<ISongResults>;
//   removeFavorite: Function;
// };

export interface FavoriteProps {
  key: string;
  id: string;
  artist: string;
  name: string;
  album?: Object; // Optional
  releaseDate?: string; // Optional
  favoriteSongs: Array<ISongResults>;
  removeFavorite: Function;
}

export interface FavoritesViewProps {
  // favoriteSongs: {
  //   id: string;
  //   artists: Array<any>;
  //   name: string;
  //   // album: Object,
  //   // releasedate: string,
  //   // genre: string
  // }[];
  favoriteSongs: ISongResults[]
  removeFavorite: Function;
}


export interface ResultsViewProps {
  // songResults: {
  //   id: string;
  //   artists: Array<any>;
  //   name: string;
  //   // album: Object,

  //   releaseDate: string;
  //   // genre: string;
  // }[];
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