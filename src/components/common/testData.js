export const fakeAPIResults = [
  {
    id: '13828',
    name: 'What kind of love are you on',
    artists: [
      // artist: {
      { id: '3d2b98e5-556f-4451-a3ff-c50ea18d57cb', name: 'Aerosmith' }
      // genre: "soundtrack",
      // },
    ],
    releasedate: "1998",
    genre: "soundtrack",
    arousal: '896000',
    valence: '312791',
    popularity: '60'
    // favorite: '0'
  },
  {
    id: '7880',
    name: 'Hot legs',
    // artist_display_name: 'Tom Jones & Tina Turner',
    artists: [
      {
        mbid: '57c6f649-6cde-48a7-8114-2a200247601a',
        name: 'Tom Jones'
        // genre: 'pop'
      },
      { id: '9072df14-b61e-42e2-b4f4-6bbb7fdb5586', name: 'Tina Turner' }
    ],

    releasedate: '1995',
    genre: 'pop',
    arousal: '981990',
    valence: '323407',
    popularity: '85',
    favorite: '0'
  },
  {
    id: '50483',
    title: 'Very ape',
    artist_display_name: 'Nirvana',
    artists: {
      artist: {
        mbid: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
        name: 'Nirvana',
        genre: 'rock'
      }
    },
    releasedate: '1993',
    genre: 'rock',
    arousal: '908000',
    valence: '306792',
    popularity: '60',
    favorite: '0'
  },
  {
    id: '74998',
    title: 'Trash',
    artist_display_name: 'Suede',
    artists: {
      artist: {
        mbid: '52a7d70a-d8a0-4732-9a76-7719750e7f9d',
        name: 'Suede',
        genre: 'pop'
      }
    },
    releasedate: '1996',
    genre: 'pop',
    arousal: '896000',
    valence: '206791',
    popularity: '85',
    favorite: '0'
  }
]

export const fakeSearchResults = [
  {
    id: '6807',
    title: 'On Sunday afternoons in 1963',
    artist_display_name: 'Rickie Lee Jones',
    artists: {
      artist: {
        mbid: '9cd9232e-7a3e-4eb9-8043-ee05c1e396ec',
        name: 'Rickie Lee Jones',
        genre: 'pop'
      }
    },
    releasedate: '1979',
    genre: 'pop',
    arousal: '134000',
    valence: '866689',
    popularity: '60',
    favorite: '0'
  },
  {
    id: '69928',
    title: "Na Laetha Geal M'óige",
    artist_display_name: 'Enya',
    artists: {
      artist: {
        mbid: '4967c0a1-b9f3-465e-8440-4598fd9fc33c',
        name: 'Enya',
        genre: 'vocal pop'
      }
    },
    releasedate: '1988',
    genre: 'vocal pop',
    arousal: '15000',
    valence: '860074',
    popularity: '60',
    favorite: '0'
  },
  {
    id: '15419',
    title: "What I've done",
    artist_display_name: 'LINKIN PARK',
    artists: {
      artist: {
        mbid: 'f59c5520-5f46-4d2c-b2c4-822eabf53419',
        name: 'Linkin Park',
        genre: 'rock'
      }
    },
    releasedate: '2007',
    genre: 'rock',
    arousal: '896000',
    valence: '315791',
    popularity: '85',
    favorite: '0'
  },
  {
    id: '4448',
    title: 'Real love',
    artist_display_name: 'John Lennon',
    artists: {
      artist: {
        mbid: '4d5447d7-c61c-4120-ba1b-d7f471d385b9',
        name: 'John Lennon',
        genre: 'pop'
      }
    },
    releasedate: '1988',
    genre: 'pop',
    arousal: '148000',
    valence: '845690',
    popularity: '60',
    favorite: '0'
  }
]

export const fakeFavorites = [
  {
    id: '6807',
    title: 'On Sunday afternoons in 1963',
    artist_display_name: 'Rickie Lee Jones',
    artists: {
      artist: {
        mbid: '9cd9232e-7a3e-4eb9-8043-ee05c1e396ec',
        name: 'Rickie Lee Jones',
        genre: 'pop'
      }
    },
    releasedate: '1979',
    genre: 'pop',
    arousal: '134000',
    valence: '866689',
    popularity: '60',
    favorite: '0'
  },
  {
    id: '69928',
    title: "Na Laetha Geal M'óige",
    artist_display_name: 'Enya',
    artists: {
      artist: {
        mbid: '4967c0a1-b9f3-465e-8440-4598fd9fc33c',
        name: 'Enya',
        genre: 'vocal pop'
      }
    },
    releasedate: '1988',
    genre: 'vocal pop',
    arousal: '15000',
    valence: '860074',
    popularity: '60',
    favorite: '0'
  },
  {
    id: '15419',
    title: "What I've done",
    artist_display_name: 'LINKIN PARK',
    artists: {
      artist: {
        mbid: 'f59c5520-5f46-4d2c-b2c4-822eabf53419',
        name: 'Linkin Park',
        genre: 'rock'
      }
    },
    releasedate: '2007',
    genre: 'rock',
    arousal: '896000',
    valence: '315791',
    popularity: '85',
    favorite: '0'
  }
]

export const testSong = {
  id: '4448',
  title: 'Real love',
  artist_display_name: 'John Lennon',
  artists: {
    artist: {
      mbid: '4d5447d7-c61c-4120-ba1b-d7f471d385b9',
      name: 'John Lennon',
      genre: 'pop'
    }
  },
  releasedate: '1988',
  genre: 'pop',
  arousal: '148000',
  valence: '845690',
  popularity: '60',
  favorite: '0'
}

export const testDuplicateSong = {
  id: '15419',
  title: "What I've done",
  artist_display_name: 'LINKIN PARK',
  artists: {
    artist: {
      mbid: 'f59c5520-5f46-4d2c-b2c4-822eabf53419',
      name: 'Linkin Park',
      genre: 'rock'
    }
  },
  releasedate: '2007',
  genre: 'rock',
  arousal: '896000',
  valence: '315791',
  popularity: '85',
  favorite: '0'
}
