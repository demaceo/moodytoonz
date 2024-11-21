import React from "react";
import { FavoriteProps } from "../common/Types";
import "./Favorite.css";
import { spotify } from "../../utilities/icons";

const Favorite = ({
  id,
  artist,
  name,
  releaseDate,
  // genre,
  favoriteSongs,
  removeFavorite,
}: FavoriteProps) => {
  const handleClick = (id: string) => {
    removeFavorite(id);
  };

  const capitalize = (songInfo: string) => {
    return songInfo
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  const searchSpotify = () => {
    let searchParams = `${name}  artist:${artist}`;
    window.open(`https://open.spotify.com/search/${searchParams}`);
  };

  console.log('id', id)

  return (
    <article className="favorite" id={id}>
      <div className="fav-details">
        <div className="fav-title-artist">
          <h1>{capitalize(name)}</h1>
          <h3>{capitalize(artist)}</h3>
        </div>
        <div className="fav-date-genre">
          <span className={`fav-badge`}>
            <b>Release Date:</b> {releaseDate}
          </span>
          {/* <span className={`fav-badge`}>
            <b>Genre:</b> {capitalize(genre)}
          </span> */}
        </div>
      </div>
      <div className="fav-button-container">
        <button onClick={() => handleClick(id)} className="remove-fav-btn">
          Remove
        </button>
        <button
          onClick={() => searchSpotify()}
          className="spotify-button"
          data-testid="spotify"
        >
          {spotify}
        </button>
      </div>
    </article>
  );
};

export default Favorite;
