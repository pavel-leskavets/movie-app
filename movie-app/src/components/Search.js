import React, { Component } from "react";
import SearchButton from "./SearchButton";
import MovieCard from "./MovieCard";
import "../../src/App.css"

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
    return `https://reactjs-cdp.herokuapp.com/movies?search=${this.state.value}&searchBy=${this.state.type}`;
  };

  render() {
    return (
      <div className="body">
        <div className="form">
          <form onSubmit={this.handleSubmit} className="search-form" id="searchthis">
            <input type="text" id="search-box" value={this.state.value} onChange={this.handleChange} />
            <SearchButton name="Search" />
          </form>
        </div>

        <div class="card">
          <div className="title-button">
            <input type="radio" name="title" id="one" value="title" checked={this.state.radioGroup.title} onChange={this.handleRadio} />
            <label for="one"> Title</label>
          </div>
          <div className="genres-button">
            <input type="radio" name="genres" id="two" value="genres" checked={this.state.radioGroup.genres} onChange={this.handleRadio} />
            <label for="two">Genres </label>
          </div>
        </div>
        <div className="movies-found">
          {this.state.movies.length} Movies found
        </div>
        <div className="movie">
          {" "}{this.state.movies.map(movie => (<MovieCard {...movie} />))}{" "}
        </div>
      </div>
    );
  }
}

export default Search;
