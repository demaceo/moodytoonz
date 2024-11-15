//! https://developer.spotify.com/documentation/web-api/reference/get-recommendations
//! to add min and max for energy, valence, danceability, etc

export const moodsData = [
  {
    mood: 'Sad',
    target_valence: [0, 0.3],
    target_energy: [0.2, 0.4],
    seed_genres: ['blues', 'indie', 'acoustic', 'r-n-b', 'soul', 'rainy-day']
  },
  {
    // "mood": [
    //   "Chill",
    //   "Mellow",
    //   "Focus"
    // ],
    mood: 'Chill',
    target_valence: [0.4, 0.7],
    target_energy: [0.2, 0.5],
    seed_genres: ['ambient', 'chill', 'jazz', 'rainy-day', 'acoustic', 'study']
  },
  {
    mood: 'Energetic',
    target_valence: [0.5, 0.8],
    target_energy: [0.7, 1],
    seed_genres: [
      'rock',
      'punk',
      'hip-hop',
      'dubstep',
      'house',
      'dance',
      'electronic',
      'edm',
      'work-out',
      'afrobeat'
    ]
  },
  {
    mood: 'Amorous',
    target_valence: [0.5, 0.9],
    target_energy: [0.3, 0.6],
    seed_genres: ['r-n-b', 'soul', 'pop', 'indie', 'acoustic']
  },
  {
    mood: 'Melancholic',
    target_valence: [0, 0.4],
    target_energy: [0.2, 0.4],
    seed_genres: ['folk', 'indie', 'alternative', 'classical']
  },
  {
    mood: 'Angry',
    target_valence: [0, 0.2],
    target_energy: [0.8, 1],
    seed_genres: ['metal', 'punk', 'rock', 'hip-hop']
  },
  {
    mood: 'Motivational',
    target_valence: [0.7, 1],
    target_energy: [0.7, 1],
    seed_genres: ['pop', 'rock', 'hip-hop', 'edm']
  },
  {
    mood: 'Dreamy',
    target_valence: [0.4, 0.8],
    target_energy: [0.2, 0.5],
    seed_genres: ['dream pop', 'ambient', 'shoegaze']
  },
  // {
  //   mood: 'Nostalgic',
  //   target_valence: [0.5, 0.8],
  //   target_energy: [0.3, 0.6],
  //   seed_genres: ['80s', '90s', 'vintage', 'acoustic']
  // },
  {
    mood: 'Adventure',
    target_valence: [0.5, 0.8],
    target_energy: [0.6, 0.9],
    seed_genres: ['indie', 'rock', 'soundtracks']
  },
  {
    mood: 'Dark',
    target_valence: [0, 0.3],
    target_energy: [0.4, 0.7],
    seed_genres: ['goth', 'darkwave', 'industrial', 'alternative']
  },
  {
    mood: 'Happy',
    target_valence: [0.7, 1],
    target_energy: [0.6, 0.9],
    seed_genres: ['pop', 'folk', 'reggae', 'funk']
  },
  {
    mood: 'Surreal',
    target_valence: [0.4, 0.7],
    target_energy: [0.3, 0.6],
    seed_genres: ['experimental', 'idm', 'ambient']
  },
  {
    mood: 'Peaceful',
    target_valence: [0.4, 0.8],
    target_energy: [0.1, 0.3],
    seed_genres: [
      'classical',
      'new age',
      'ambient',
      'world',
      'sleep',
      'chill',
      'indie'
    ]
  },
  {
    mood: 'Hypnotic',
    target_valence: [0.4, 0.7],
    target_energy: [0.4, 0.7],
    seed_genres: ['techno', 'trance', 'sleep']
  },
  {
    mood: 'Spiritual',
    target_valence: [0.6, 0.9],
    target_energy: [0.2, 0.5],
    seed_genres: ['gospel', 'world-music']
  }
]
