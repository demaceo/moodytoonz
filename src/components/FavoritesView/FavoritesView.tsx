import React, { useEffect } from "react";
import Favorite from "../Favorite/Favorite";
import "./FavoritesView.css";
import { arrow } from "../../utilities/icons";
import { Link } from "react-router-dom";
import { FavoritesViewProps } from "../common/Types";

const FavoritesView = ({
  favoriteSongs,
  removeFavorite,
}: FavoritesViewProps) => {
  useEffect(() => {
    document.title = `MoodyTunes - Favorites (${favoriteSongs.length})`;
  }, [favoriteSongs.length]);

  if (favoriteSongs.length === 0) {
    return (
      <section className="no-favorites">
        <header className="favorites-header">
          <h2>Favorites View</h2>
        </header>
        <br />
        <p>
          You currently do not have any favorite songs. <br />
          <br />
          Click the '⭐️' to add a song to your Favorites.
        </p>
      </section>
    );
  } else {
    const favorites = favoriteSongs.map((fav) => {
      return (
        <Favorite
          key={`${fav.id}1`}
          id={fav.id}
          artist={fav.artists?.[0]?.name ?? "Unknown Artist"}
          name={fav.name}
          releaseDate={fav.album?.release_date ?? ""}
          url={fav.external_urls?.spotify ?? ""}
          img={fav.album?.images?.[0]?.url ?? ""}
          favoriteSongs={favoriteSongs}
          removeFavorite={removeFavorite}
        />
      );
    });
    return (
      <section className="favorites-view">
        <header className="favorites-header">
          <Link to="/results" className="back-arrow">
            {arrow}
          </Link>
          <h2>Favorites View</h2>
        </header>
        <article className="favs-container">{favorites}</article>
      </section>
    );
  }
};

export default FavoritesView;
