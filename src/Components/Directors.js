import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../App.css";

function Directors() {
  const [search, setSearch] = useState("");
  const [directors, setDirectors] = useState([]);

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
          const directorId = response.data.results[0].id;

          axios
            .get(
              `https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=eee77830af682795aa9cd53fe37d9fd6`
            )
            .then((response) => {
              const movies = response.data.crew.filter(
                (credit) => credit.job === "Director"
              );

              setDirectors(movies);
            })
            .catch((error) => {
              console.error("Error fetching movie credits: ", error);
            });
        } else {
          console.log("Director not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div>
      <h1 className="Directors-title">Movie search function</h1>
      <h2 className="Directors-bio">
        Search for any movie name and you'll recieve all the information you
        need about it!
      </h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="Directors-search-bar"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="Directors-button" type="submit">
          Search
        </button>
      </form>

      {directors.map((movie) => (
        <Link key={movie.credit_id} to={`/movies/${movie.id}`}>
          <MovieCard className="Directors-MovieCard" movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default Directors;
