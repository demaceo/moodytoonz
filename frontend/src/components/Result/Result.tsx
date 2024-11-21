import { useState, useEffect } from "react";
import "./Result.css";
import React from "react";

import { ResultProps } from "../common/Types";
import { gsap } from "gsap";
import { spotify } from "../../utilities/icons";

const Result = ({
  id,
  artist,
  name,
  releaseDate,
  // genre,
  favoriteSongs,
  addFavorite,
}: ResultProps) => {
  const [inFavorites, setInFavorites] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkFavoriteStatus = () => {
    const match = favoriteSongs.find((song) => song.id === id);
    if (match) {
      setInFavorites(true);
      animateAddFavorite();
    } else {
      setInFavorites(false);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const animateAddFavorite = () => {
    let tl = gsap.timeline();
    gsap.set(`.${"--" + id}`, {
      //start animation state
      transition: "ease 0",
      transform: "rotate(0deg)",
    });

    tl.to(`.${"--" + id}`, { duration: 0.1, translateY: 3 })
      .to(`.${"--" + id}`, { duration: 0.3, rotateY: 360, translateY: -10 })
      .to(`.${"--" + id}`, { duration: 0.3, translateY: 0 })
      .to(
        `.${"--" + id}`,
        { duration: 0.2, filter: "grayscale(0%)", cursor: "default" },
        "-=.4"
      )
      .to(
        `.title-artist-${id}`,
        { duration: "0.2 !important", color: "rgb(253,235,103)" },
        "-=.4"
      )
      .to(
        `.badge-${id}`,
        {
          borderColor: "rgb(253,235,103)",
          backgroundColor: "rgb(253,235,103)",
          color: "rgb(40,44,52)",
        },
        "<"
      )
      .to(`.card-${id}`, { border: "solid 3px rgb(253,235,103)" }, "<")
      .to(`.${"--" + id}`, {
        ease: "none",
        duration: 8,
        repeat: -1,
        rotate: 360,
      });
    setInFavorites(true);
  };

  const handleClick = () => {
    if (!inFavorites) {
      addFavorite(id);
      animateAddFavorite();
    }
  };

  const searchSpotify = () => {
    let searchParams = `${name}  artist:${artist}`;
    window.open(`https://open.spotify.com/search/${searchParams}`);
  };

  const capitalize = (songInfo: string) => {
    return songInfo
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  return (
    <article className={`song-result card-${id}`} id={id}>
      <div className="song-details">
        <div className={`title-artist title-artist-${id}`}>
          <h1>{capitalize(name)}</h1>
          <h3>{capitalize(artist)}</h3>
        </div>
        <div className="date-genre">
          <span className={`badge badge-${id}`}>
            <b>Release Date:</b> {releaseDate}
          </span>
          {/* <span className={`badge badge-${id}`}>
            <b>Genre:</b> {capitalize(genre)}
          </span> */}
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={() => searchSpotify()}
          className="spotify-button"
          data-testid="spotify"
        >
          {spotify}
        </button>
        <button
          onClick={() => handleClick()}
          className={`btn favoriteBtn --${id}`}
        >
          ⭐
        </button>
      </div>
    </article>
  );
};

export default Result;
