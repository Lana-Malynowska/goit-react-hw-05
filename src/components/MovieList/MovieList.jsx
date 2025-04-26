import React from "react";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";

const MovieList = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieDetailsPage onClick={() => onMovieClick(movie)} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
