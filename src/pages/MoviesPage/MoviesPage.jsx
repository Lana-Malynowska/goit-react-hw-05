import React from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  // const [query, setQuery] = useState("");

  // const handleSearchSubmit = (searchQuery) => {
  //   setQuery(searchQuery);
  //   setPage(1);
  //   setHasMore(true);
  //   setError(false);
  // };

  return (
    <div>
      <Toaster position="top-center" />
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default MoviesPage;
