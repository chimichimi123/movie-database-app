import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function MovieCard({ movie, onLike }) {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const handleLikeClick = () => {
    onLike(movie);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=eee77830af682795aa9cd53fe37d9fd6`
      )
      .then((response) => {
        setCast(response.data.cast);
        setCrew(response.data.crew);
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
  }, [movie.id]);

  const leadingActor = cast[0]?.name;
  const director = crew.find((member) => member.job === "Director")?.name;

  return (
    <div className="MovieCard">
      <h2 className="Movie-title">{movie.title}</h2>
      <p className="movie-year">Year:{movie.release_date}</p>
      <p className="Movie-overview">overview:{movie.overview}</p>
      <p className="Leading Actor">Leading Actor: {leadingActor}</p>
      <p className="Director">Director: {director}</p>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <button className="Like-button" onClick={handleLikeClick}>
        Like
      </button>
    </div>
  );
}

export default MovieCard;
