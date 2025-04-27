import React from "react";
import s from "./MovieList.module.css";
import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) return null;

  return (
    <ul className={s.movies}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "https://placehold.co/500x750/cccccc/333333?text=Poster+Not+Available&font=avenir";

        return (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
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
