import React, { useState, useEffect, useRef } from "react";
import Form from "../Form/Form";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { fetchSongsForMood } from "../../utilities/apiRequests";
import ResultsView from "../ResultsView/ResultsView";
import FavoritesView from "../FavoritesView/FavoritesView";
import { ISongResults, MoodData } from "../common/Types";
import { useLocalStorage } from "../../utilities/useLocalStorage";
import NavBar from "../NavBar/NavBar";
import { moodsData } from "../common/moods.js";

function App() {
  const [favoriteSongs, setFavoriteSongs] = useState<ISongResults[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage("favorites");
  const [moodName, setMoodName] = useState("");
  const [decade, setDecade] = useState("");
  const [finalResults, setFinalResults] = useState<ISongResults[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bumped on every new fetch/reset so a late-resolving stale request can't
  // overwrite results from a mood the user has since navigated away from.
  const latestRequestId = useRef(0);

  useEffect(() => {
    let storedFavs: any = localStorage;
    storedFavs = storedFavs ? storedFavs : [];
    setFavoriteSongs(storedFavs);
  }, [localStorage]);

  const getGenres = (mood: string) => {
    const genreList = moodsData.find(
      (item: MoodData) => item.mood.toLowerCase() === mood.toLowerCase()
    );
    return genreList ? genreList.seed_genres : undefined;
  };

  const getMoodyTunes = async (moodWord: string) => {
    const requestId = ++latestRequestId.current;
    setIsLoading(true);
    setError(null);

    try {
      const songs = await fetchSongsForMood(getGenres(moodWord), decade);
      if (requestId === latestRequestId.current) {
        setFinalResults(songs);
      }
    } catch (err) {
      if (requestId === latestRequestId.current) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong fetching songs."
        );
        setFinalResults([]);
      }
    } finally {
      if (requestId === latestRequestId.current) {
        setIsLoading(false);
      }
    }
  };

  const updateMoodName = (moodWord: string) => {
    setMoodName(moodWord);
  };

  const clearMoodName = () => {
    latestRequestId.current++; // invalidate any in-flight fetch
    setMoodName("");
    setDecade("");
    setFinalResults([]);
    setIsLoading(false);
    setError(null);
  };

  const addFavorite = (id: string) => {
    const favorite = finalResults.find((song: ISongResults) => song.id === id);
    if (!favorite) return;
    setFavoriteSongs((prevFavorites) => {
      const currentFavorites = prevFavorites ?? [];
      if (currentFavorites.some((song) => song.id === favorite.id)) {
        return currentFavorites;
      }
      const updated = [favorite, ...currentFavorites];
      setLocalStorage(updated);
      return updated;
    });
  };

  const removeFavorite = (id: string) => {
    const favorites = favoriteSongs.filter(
      (song: ISongResults) => song.id !== id
    ) as any;
    setFavoriteSongs(favorites);
    setLocalStorage(favorites);
  };

  const checkSongResults = () => {
    if (isLoading) {
      return (
        <h2>
          <br />
          One moment while your song results load...
          <br />
        </h2>
      );
    }

    if (error) {
      return (
        <h2>
          {error}
          <br />
          <p>
            <button
              className="submit-button"
              onClick={() => getMoodyTunes(moodName)}
            >
              Try Again
            </button>
          </p>
          <p>Or click the "Home" button to pick a different mood.</p>
        </h2>
      );
    }

    if (finalResults.length) {
      return (
        <ResultsView
          addFavorite={addFavorite}
          songResults={finalResults}
          moodName={moodName}
          favoriteSongs={favoriteSongs as any}
        />
      );
    }

    return (
      <h2>
        Sorry, there are no results for that selection.
        <br />
        <p>Click the "Home" or "back" button to try again.</p>
      </h2>
    );
  };

  return (
    <div className="App">
      <NavBar clearMoodName={clearMoodName} />
      <Routes>
        <Route
          path="/favorites"
          element={
            <FavoritesView
              removeFavorite={removeFavorite}
              favoriteSongs={favoriteSongs}
            />
          }
        />
        <Route path="/results" element={checkSongResults()} />
        <Route
          path="/"
          element={
            <Form
              getMoodyTunes={getMoodyTunes}
              updateMood={updateMoodName}
              setDecade={setDecade}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
