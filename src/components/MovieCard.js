import React, { Component } from "react";

class MovieCard extends Component {
  render() {
    const { title, poster_path, release_date, genres, overview } = this.props;

    return (
      <div className="moviecard">
        <div id="container">
          <img src={poster_path} alt={title} />
          <p>{overview}</p>
        </div>
        <p>{title}</p>
        <p className="title">
          {genres.slice(1, 3).join(" & ")}{" "}
          <div className="release-date">{release_date.substring(0, 4)}</div>
        </p>
        
      </div>
    );
  }
}
export default MovieCard;
