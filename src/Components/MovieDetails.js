import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

function MovieDetails({
  movie,
  loading,
  error,
  setLoading,
  setError,
  setMovie,
  onLike,
}) {
  const { id } = useParams();

  const handleLikeClick = () => {
    onLike(movie);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=eee77830af682795aa9cd53fe37d9fd6`
      )
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="MovieDetails">
      <h2>{movie.title}</h2>
      <p className="detail year">Year: {movie.release_date}</p>
      <p className="detail plot">Plot: {movie.overview}</p>
      <p className="detail rating">IMDB Rating: {movie.vote_average}</p>
      <p className="detail runtime">Runtime: {movie.runtime}</p>
      <p className="detail genre">
        Genre: {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <img
        className="movie-details-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <button onClick={handleLikeClick}>Like</button>
    </div>
  );
}

export default MovieDetails;
