import React, { useEffect } from "react";
import Result from "../Result/Result";
import { ResultsViewProps } from "../common/Types";

const ResultsView = ({
  addFavorite,
  songResults,
  favoriteSongs,
  moodName,
}: ResultsViewProps) => {
  useEffect(() => {
    document.title = `MoodyTunes - Results (${songResults.length})`;
  }, [songResults.length]);

    const seenKeys = new Set();

    // Filter out songs with duplicate keys
    const uniqueSongs = songResults.filter((song) => {
      if (seenKeys.has(song.id)) {
        return false;
      }
      seenKeys.add(song.id); 
      return true; 
    });

  const songs = uniqueSongs.map((song) => {
    return (
      <Result
        key={`${song.id}-${song.name}`}
        id={song.id}
        artist={song["artists"][0].name}
        name={song["name"]}
        releaseDate={song.album.release_date}
        url={song.external_urls["spotify"]}
        img={song.album.images[0]["url"]}
        favoriteSongs={favoriteSongs}
        addFavorite={addFavorite}
      />
    );
  });
  return (
    <section className="results-view">
      <h2 className="container-title">"{moodName}" song results:</h2>
      {songs}
    </section>
  );
};

export default ResultsView;
