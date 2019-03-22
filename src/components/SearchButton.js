import React, { Component } from 'react';

class SearchButton extends Component {
    render() {
        return(
            <button className="search-btn">{this.props.name}</button>
        )
    }
}
export default SearchButton;