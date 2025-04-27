import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import { ClockLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (loading) {
    return (
      <ClockLoader
        color="#646cffaa"
        size={50}
        cssOverride={{
          margin: "0 auto",
        }}
      />
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!cast) return null;

  return (
    <ul className={s.cast}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={s.actor}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : `https://placehold.co/200x300/cccccc/333333?text=Photo+${actor.name}+Not+Available&font=avenir`
            }
            alt={actor.name}
          />
          <strong>{actor.name}</strong>
          <p>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
