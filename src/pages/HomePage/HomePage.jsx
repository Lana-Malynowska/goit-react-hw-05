import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import { ClockLoader } from "react-spinners";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  //   const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        const { movies: newMovies, totalPages } = await fetchMovies(
          query,
          page
        );
        setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
        setHasMore(page < totalPages);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(true);
      }
    };
    getMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : (
        <div>
          <MovieList movies={movies} />
          {loading && <ClockLoader />}
          {movies.length > 0 && hasMore && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
