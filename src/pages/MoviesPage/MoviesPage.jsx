import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { fetchMovies } from "../../services/api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        const { results, total_pages } = await fetchMovies(query, page);
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
        setHasMore(page < total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (searchQuery) => {
    setSearchParams({ query: searchQuery });
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setError(false);
    setHasSearched(true);
  };

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {hasSearched && movies.length === 0 && !loading && (
        <p className={s.message}>
          <strong>
            Oops! No matches found for your search... Try something else!
          </strong>
        </p>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}

      {loading && (
        <ClockLoader
          color="#646cff"
          size={50}
          cssOverride={{
            margin: "0 auto",
          }}
        />
      )}

      {movies.length > 0 && hasMore && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
