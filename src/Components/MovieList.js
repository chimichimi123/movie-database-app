import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../App.css";

function MovieList({ setError, handleLike }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=eee77830af682795aa9cd53fe37d9fd6&query=${searchTerm}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  return (
    <div className="movie-List-div">
      <h1 className="MovieList-title">Movie search function</h1>
      <h2 className="bio">
        Search for any movie name and you'll recieve all the information you
        need about it!
      </h2>
      <input
        className="search-bar"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearchTerm(e.target.value);
        }}
      />
      <ul className="movie-list">
        {Array.isArray(movies) &&
          movies.map((movie) => {
            const movieData = {
              id: movie.id,
              title: movie.title,
              release_date: movie.release_date,
              overview: movie.overview,
              poster_path: movie.poster_path,
            };
            return (
              <li className="Moviecard-holder" key={movie.id}>
                <Link className="moviecard-link" to={`/movies/${movie.id}`}>
                  <div className="movie-card-container">
                    <MovieCard movie={movieData} onLike={handleLike} />
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MovieList;
