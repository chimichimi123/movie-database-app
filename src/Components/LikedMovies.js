import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../App.css";

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/movies")
      .then((response) => {
        setLikedMovies(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div className="LikedMovies">
      {likedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default LikedMovies;
