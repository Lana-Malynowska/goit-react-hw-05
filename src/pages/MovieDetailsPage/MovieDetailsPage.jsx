import React from "react";

const MovieDetailsPage = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt} />
      <div>
        <h2>title</h2>
        <p>Overview</p>
        <p>Genres:</p>
        <p>Rating:</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
