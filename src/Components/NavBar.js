import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/Directors">Directors</Link>
      <Link to="/actors">Actors</Link>
      <Link to="/liked-movies">Liked Movies</Link>
    </nav>
  );
}

export default NavBar;
