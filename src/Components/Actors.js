import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Actors() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=eee77830af682795aa9cd53fe37d9fd6&query=${search}`
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          const actorId = response.data.results[0].id;

          axios
            .get(
              `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=eee77830af682795aa9cd53fe37d9fd6`
            )
            .then((response) => {
              const movies = response.data.cast;

              setMovies(movies);
            })
            .catch((error) => {
              console.error("Error fetching movie credits: ", error);
            });
        } else {
          console.log("Actor not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div>
      <h1 className="Actors-title">Actor search function</h1>
      <h2 className="actors-bio">
        Search any actors name and you'll every movie they've starred in!
      </h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="Actor-searchbar"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="Actor-button" type="submit">
          Search
        </button>
      </form>

      {movies.map((movie) => (
        <Link key={movie.credit_id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default Actors;
