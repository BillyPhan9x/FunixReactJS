import React from "react";

import Movie from "./Movie";

import styles from "./MoviesList.module.css";

const MoviesList = (props) => {
  return (
    <ul className={styles["movies-list"]}>
      {props.movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
