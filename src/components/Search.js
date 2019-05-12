import React, { Component } from "react";
import SearchButton from "./SearchButton";
import MovieCard from "./MovieCard";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      type: "",
      movies: [],
      radioGroup: {
        title: false,
        genres: false
      }
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    if (this.state.radioGroup.title) {
      this.setState({ type: "title" });
    } else if (this.state.radioGroup.genres) {
      this.setState({ type: "genres" });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchMovies();
    this.setState({ value: "" });
  };

  fetchMovies = async searchMovie => {
    const response = await fetch(this.creatingQqueryString());
    const result = await response.json();
    this.setState({ movies: result.data });
  };

  handleRadio = e => {
    let object = {};
    object[e.target.value] = e.target.checked;
    this.setState({ radioGroup: object });
    this.setState({ value: "" });
  };

  creatingQqueryString = () => {
    return `https://reactjs-cdp.herokuapp.com/movies?search=${
      this.state.value
    }&searchBy=${this.state.type}&limit=20`;
  };

  render() {
    return (
      <div>
        <div className="change-form">
          <div className="form">
            <form onSubmit={this.handleSubmit} id="searchthis">
              <input
                type="text"
                id="search-box"
                placeholder="
                Select search type and enter title"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <SearchButton name="Search" />
            </form>
          </div>

          <div className="card">
            <div>
              <input
                type="radio"
                name="title"
                id="one"
                value="title"
                checked={this.state.radioGroup.title}
                onChange={this.handleRadio}
              />
              <label htmlFor="one"> Title</label>
            </div>
            <div>
              <input
                type="radio"
                name="genres"
                id="two"
                value="genres"
                checked={this.state.radioGroup.genres}
                onChange={this.handleRadio}
              />
              <label htmlFor="two"> Genres </label>
            </div>
          </div>
          <div className="movies-found">
            {this.state.movies.length} Movies found
          </div>
        </div>
        <div className="movie">
          {" "}
          {this.state.movies.map(movie => (
            <MovieCard key={movie.title} {...movie} />
          ))}{" "}
        </div>
      </div>
    );
  }
}

export default Search;
