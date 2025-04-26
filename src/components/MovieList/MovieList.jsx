import React from "react";
import s from "./MovieList.module.css";
import { NavLink } from "react-router-dom";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={s.movies}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";

        return (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}>
              <img src={posterUrl} alt={movie.title} className={s.poster} />
              <h3 className={s.title}>{movie.title}</h3>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
