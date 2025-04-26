import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTJkN2ViMDU1ZWJmN2M4MDQ2YTU5YzY4OGE4ODBmNiIsIm5iZiI6MTc0NTQyNzkwNC4yMzYsInN1YiI6IjY4MDkxZGMwYjZjNjNkMjcwZmFhZjQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P4YuhGO7-89zhyJ_206yv5YDDGPEwW_QC7NgxcahWI8";

export const getTrendMovies = async (page = 1) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        page,
      },
    }
  );

  return response.data;
};

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
    }
  );

  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response.data;
};
