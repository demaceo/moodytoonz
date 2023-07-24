export const allGenres: string[] = [
  "hip hop",
  "vocal pop",
  "rock",
  "electro",
  "pop",
  "randb",
  "metal",
  "classical",
  "jazz",
  "soundtrack",
  "world",
  "latin",
  "reggae",
  "folk",
  "blues",
  "country"
];

export interface ISongResults {
  id: string,
  artist_display_name: string,
  title: string,
  releasedate: string,
  genre: string
}

export interface FormProps {
  getMoodyTunes: Function;
  updateMood: Function;
}

export interface ResultProps {
  key: string;
  id: string;
  artist: string;
  title: string;
  releaseDate: string;
  genre: string;
  favoriteSongs: Array<ISongResults>;
  addFavorite: Function;
};

export interface FavoriteProps {
  key: string;
  id: string;
  artist: string;
  title: string;
  releaseDate: string;
  genre: string;
  favoriteSongs: Array<ISongResults>;
  removeFavorite: Function;
};

export interface ResultsViewProps {
  songResults: {
    id: string;
    artist_display_name: string;
    title: string;
    releasedate: string;
    genre: string;
  }[];
  favoriteSongs: Array<ISongResults>;
  addFavorite: Function;
  moodName: string;
}
