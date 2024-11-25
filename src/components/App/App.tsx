import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  fetchRecommendations,
  filterByDecade,
} from "../../utilities/apiRequests";
import ResultsView from "../ResultsView/ResultsView";
import FavoritesView from "../FavoritesView/FavoritesView";
import { ISongResults, MoodData } from "../common/Types";
import { useLocalStorage } from "../../utilities/useLocalStorage";
import NavBar from "../NavBar/NavBar";
import { moodsData } from "../common/moods.js";

function App() {
  // const [songResults, setSongResults] = useState<ISongResults[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<ISongResults[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage("favorites");
  const [moodName, setMoodName] = useState("");
  const [decade, setDecade] = useState("");
  const [finalResults, setFinalResults] = useState<any[]>([]);

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

  const addUniqueSongs = (newSongs: any[]) => {
    const seenIds = new Set();
    // Filter out songs with duplicate IDs
    const filteredSongs = newSongs.filter((song) => {
      if (seenIds.has(song.id)) {
        return false;
      }
      seenIds.add(song.id);
      return true;
    });

    // Add the unique songs to finalResults
    setFinalResults((prevResults) => [...prevResults, ...filteredSongs]);
  };

  const getMoodyTunes = async (mood: string, moodName: string) => {
    const [minValence, maxValence, minEnergy, maxEnergy] = mood
      .split(",")
      .map(Number);

    const genres: string[] | undefined = getGenres(moodName);

    let allResults: ISongResults[] = [];
    // Keep fetching until we get at least 50 results
    while (allResults.length < 30) {
      const initialResults = await fetchRecommendations(
        minValence,
        maxValence,
        minEnergy,
        maxEnergy,
        genres
      );
      const filteredResults = filterByDecade(initialResults, decade);
      allResults = [...allResults, ...filteredResults];

      // add some delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Update the finalResults state with the accumulated results
    setFinalResults(allResults);
  };

  const updateMoodName = (moodWord: string) => {
    setMoodName(moodWord);
  };

  const clearMoodName = () => {
    setMoodName("");
    setDecade("");
    setFinalResults([]);
  };

  const addFavorite = (id: string) => {
    const favorite = finalResults.find(
      (song: ISongResults) => song.id === id
    ) as any;
    if (favoriteSongs === undefined) {
      setFavoriteSongs([favorite]);
      setLocalStorage(favoriteSongs);
    } else if (!favoriteSongs.includes(favorite)) {
      setFavoriteSongs([favorite, ...favoriteSongs]);
      setLocalStorage([favorite, ...favoriteSongs]);
    }
  };

  const removeFavorite = (id: string) => {
    const favorites = favoriteSongs.filter(
      (song: ISongResults) => song.id !== id
    ) as any;
    setFavoriteSongs(favorites);
    setLocalStorage(favorites);
  };

  const checkSongResults = () => {
    if (!finalResults) {
      return (
        <h2>
          Sorry, there are no results for that selection.
          <br />
          <p>Click the "Home" or "back" button to try again.</p>
        </h2>
      );
    } else if (finalResults.length) {
      return (
        <ResultsView
          addFavorite={addFavorite}
          songResults={finalResults}
          moodName={moodName}
          favoriteSongs={favoriteSongs as any}
        />
      );
    } else if (!finalResults.length) {
      return (
        <h2>
          <br />
          One moment while your song results load...
          <br />
        </h2>
      );
    }
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
