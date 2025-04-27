import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import { ClockLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
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

  if (!reviews) return null;

  return (
    <ul className={s.reviews}>
      {reviews.map((review) => {
        const rating = Math.round(review.author_details.rating / 2) || 0;
        const maxStars = 5;

        return (
          <li key={review.author + review.created_at} className={s.review}>
            <div className={s.author}>
              <strong>{review.author}</strong>,{" "}
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
            <ul className={s.rating}>
              {Array.from({ length: rating }, (_, index) => (
                <li key={`filled-${index}`} className={s.filledStar}>
                  ★
                </li>
              ))}
              {Array.from({ length: maxStars - rating }, (_, index) => (
                <li key={`empty-${index}`} className={s.emptyStar}>
                  ☆
                </li>
              ))}
            </ul>
            <p className={s.content}>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
