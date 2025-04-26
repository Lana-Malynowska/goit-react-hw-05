import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTJkN2ViMDU1ZWJmN2M4MDQ2YTU5YzY4OGE4ODBmNiIsIm5iZiI6MTc0NTQyNzkwNC4yMzYsInN1YiI6IjY4MDkxZGMwYjZjNjNkMjcwZmFhZjQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P4YuhGO7-89zhyJ_206yv5YDDGPEwW_QC7NgxcahWI8";

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US'",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        query,
        page,
        per_page: 12,
      },
    }
  );

  return response.data;
};
