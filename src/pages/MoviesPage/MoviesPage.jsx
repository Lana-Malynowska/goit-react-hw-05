import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ClockLoader } from "react-spinners";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        const { results, total_pages } = await fetchMovies(query, page);
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
        setHasMore(page < total_pages);
      } catch (error) {
        console.error("Failed to load movies", error);
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
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);
    setError(false);
  };

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearchSubmit} />
      <MovieList movies={movies} />
      {loading && (
        <ClockLoader
          color="#646cffaa"
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
