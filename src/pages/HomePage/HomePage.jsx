import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendMovies } from "../../services/api";
import { ClockLoader } from "react-spinners";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const { results, total_pages } = await getTrendMovies(page);
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
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className={s.home}>
      <h2>Trending today</h2>
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

export default HomePage;
