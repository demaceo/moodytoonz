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

  const songs = songResults.map((song) => {
    console.log(song)
    return (
      <Result
        key={song.id}
        id={song.id}
        artist={song["artists"][0].name}
        name={song["name"]}
        releaseDate={song.album.release_date}
        // genre={song.genre}
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
