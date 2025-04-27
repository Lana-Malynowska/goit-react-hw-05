import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTJkN2ViMDU1ZWJmN2M4MDQ2YTU5YzY4OGE4ODBmNiIsIm5iZiI6MTc0NTQyNzkwNC4yMzYsInN1YiI6IjY4MDkxZGMwYjZjNjNkMjcwZmFhZjQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P4YuhGO7-89zhyJ_206yv5YDDGPEwW_QC7NgxcahWI8";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getTrendMovies = async (page = 1) => {
  const response = await api.get(`trending/movie/day`, {
    params: { language: "en-US", page },
  });
  return response.data;
};

export const fetchMovies = async (query, page = 1) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};
