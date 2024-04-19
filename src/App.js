import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import Directors from "./Components/Directors";
import Actors from "./Components/Actors";
import LikedMovies from "./Components/LikedMovies";
import MovieCard from "./Components/MovieCard";

function App() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleLike = (movie) => {
    console.log("Like movie", movie);

    if (Array.isArray(likedMovies)) {
      const alreadyLiked = likedMovies.some(
        (likedMovie) => likedMovie.id === movie.id
      );

      if (!alreadyLiked) {
        axios
          .post("http://localhost:8000/movies", movie)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        console.log("Movie is already liked");
      }
    } else {
      console.error("likedMovies is not an array");
    }
  };

  const likeMovie = (movie) => {
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies/:id"
            element={
              <MovieDetails
                movie={movie}
                error={error}
                setError={setError}
                setLoading={setLoading}
                setMovie={setMovie}
                onLike={handleLike}
              />
            }
          />
          <Route path="/Directors" element={<Directors />} />
          <Route path="/Actors" element={<Actors />} />
          <Route
            path="/movies"
            element={<MovieList movies={movies} handleLike={handleLike} />}
          />
          <Route
            path="/liked-movies"
            element={
              <LikedMovies likedMovies={likedMovies} likeMovie={likeMovie} />
            }
          />
        </Routes>
        ;
        {likedMovies.map((movie) => (
          <MovieCard onLike={handleLike} />
        ))}
      </div>
    </Router>
  );
}

export default App;
