import { Link } from "react-router-dom";
// import { musicNote } from "../../utilities/icons";
import "./NavBar.css";
import React from "react";

const NavBar = ({ clearMoodName }: any) => {
  const handleClick = () => {
    clearMoodName();
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-name-link">
        {/* <div className="music-note">{musicNote}</div> */}
        <h1 onClick={handleClick}>MoodyTunes</h1>
      </Link>
      <nav className="link-container">
        <Link to="/" className="nav-btn-link">
          <div className="nav-btn" onClick={handleClick}>
            Home
          </div>
        </Link>
        <Link to="/favorites" className="nav-btn-link">
          <div className="nav-btn">Favorites</div>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
