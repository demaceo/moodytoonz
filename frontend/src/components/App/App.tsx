import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { fetchRecommendations } from "../../utilities/apiRequests";
import ResultsView from "../ResultsView/ResultsView";
import FavoritesView from "../FavoritesView/FavoritesView";
import { ISongResults, MoodData } from "../common/Types";
import { useLocalStorage } from "../../utilities/useLocalStorage";
import NavBar from "../NavBar/NavBar";
import { moodsData } from "../common/moods.js";

function App() {
  const [songResults, setSongResults] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState<ISongResults[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage("favorites");
  const [moodName, setMoodName] = useState("");

  useEffect(() => {
    let storedFavs: any = localStorage;
    storedFavs = storedFavs ? storedFavs : [];
    setFavoriteSongs(storedFavs);
  }, [localStorage]);


  const getGenres = (mood: string) => {
    const genreList = moodsData.find(
      (item: MoodData) => item.mood.toLowerCase() === mood.toLowerCase()
    );
    // If a mood was found, return its seed_genres; otherwise, return a default message
    return genreList ? genreList.seed_genres : undefined;
  };

  const getMoodyTunes = async (mood: string, decade: string, moodName: string) => {
    const arousal: number = parseInt(mood.split(",")[0]);
    const valence: number = parseInt(mood.split(",")[1]);
    const genres: string[] | undefined = getGenres(moodName);
    const results = await fetchRecommendations(
      valence,
      arousal,
      genres,
      decade
    );
    setSongResults(results);
  };

  const updateMoodName = (moodWord: string) => {
    setMoodName(moodWord);
  };

  const clearMoodName = () => {
    setMoodName("");
  };

  const addFavorite = (id: string) => {
    const favorite = songResults.find(
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
    if (!songResults) {
      return (
        <h2>
          Sorry, there are no results for that selection.
          <br />
          <p>Click the "Home" or "back" button to try again.</p>
        </h2>
      );
    } else if (songResults.length) {
      return (
        <ResultsView
          addFavorite={addFavorite}
          songResults={songResults}
          moodName={moodName}
          favoriteSongs={favoriteSongs as any}
        />
      );
    } else if (!songResults.length) {
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
            <Form getMoodyTunes={getMoodyTunes} updateMood={updateMoodName} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
