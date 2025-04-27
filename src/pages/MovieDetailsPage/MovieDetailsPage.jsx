import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import { ClockLoader } from "react-spinners";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <ClockLoader
        color="#646cff"
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

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://placehold.co/500x750/cccccc/333333?text=Poster+Not+Available&font=avenir";

  return (
    <div className={s.movie}>
      <button className={s.link} onClick={() => navigate(backLink)}>
        Go back
      </button>
      <div className={s.card}>
        <img src={posterUrl} alt={movie.title} className={s.poster} />
        <div className={s.info}>
          <h3>{movie.title}</h3>
          <p>
            <strong>Overview: </strong>
            {movie.overview}
          </p>
          <p>
            <strong>Genres: </strong>
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Rating: </strong>
            {movie.vote_average}
          </p>
        </div>
      </div>
      <div>
        <h4>Additional info</h4>
        <nav className={s.links}>
          <NavLink to="cast" state={{ from: backLink }} className={s.link}>
            Cast
          </NavLink>
          <NavLink to="reviews" state={{ from: backLink }} className={s.link}>
            Reviews
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
