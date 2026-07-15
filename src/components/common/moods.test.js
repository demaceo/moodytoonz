import { moodsData } from "./moods";

// Mirrors the Spotify genre-seed reference list kept (commented out) at the top of
// moods.js. Kept independent here so a typo'd/invalid genre added to moodsData
// (like the old 'dream pop' / 'new age' / 'world' bugs) fails this test.
const VALID_SPOTIFY_GENRES = new Set([
  "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime",
  "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat",
  "british", "cantopop", "chicago-house", "children", "chill", "classical",
  "club", "comedy", "country", "dance", "dancehall", "death-metal",
  "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub",
  "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro",
  "french", "funk", "garage", "german", "gospel", "goth", "grindcore",
  "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore",
  "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house",
  "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance",
  "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino",
  "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno",
  "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party",
  "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop",
  "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b",
  "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll",
  "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo",
  "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul",
  "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop",
  "tango", "techno", "trance", "trip-hop", "turkish", "work-out",
  "world-music",
]);

describe("moodsData", () => {
  it("has at least one mood", () => {
    expect(moodsData.length).toBeGreaterThan(0);
  });

  it.each(moodsData.map((mood) => [mood.mood, mood]))(
    "%s has a well-formed valence/energy range and genre list",
    (_name, mood) => {
      expect(mood.target_valence).toHaveLength(2);
      expect(mood.target_energy).toHaveLength(2);

      const [minValence, maxValence] = mood.target_valence;
      const [minEnergy, maxEnergy] = mood.target_energy;
      expect(minValence).toBeGreaterThanOrEqual(0);
      expect(maxValence).toBeLessThanOrEqual(1);
      expect(minValence).toBeLessThanOrEqual(maxValence);
      expect(minEnergy).toBeGreaterThanOrEqual(0);
      expect(maxEnergy).toBeLessThanOrEqual(1);
      expect(minEnergy).toBeLessThanOrEqual(maxEnergy);

      expect(mood.seed_genres.length).toBeGreaterThan(0);
      mood.seed_genres.forEach((genre) => {
        expect(VALID_SPOTIFY_GENRES.has(genre)).toBe(true);
      });
    }
  );

  it("does not exceed Spotify's historical 5-seed limit per mood", () => {
    moodsData.forEach((mood) => {
      expect(mood.seed_genres.length).toBeLessThanOrEqual(5);
    });
  });

  it("has unique mood names", () => {
    const names = moodsData.map((mood) => mood.mood.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});
