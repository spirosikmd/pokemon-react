import React, { Component } from 'react';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.handleSearchTextInputChange = this.handleSearchTextInputChange.bind(
      this
    );
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleSearchTextInputChange(e) {
    this.props.onSearchTextInput(e.target.value);
  }

  handleInStockInputChange(e) {
    this.props.onFavoriteInput(e.target.checked);
  }

  render() {
    return (
      <form>
        <label>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.searchText}
            onChange={this.handleSearchTextInputChange}
          />
        </label>
        <p>
          <label>
            <input
              type="checkbox"
              checked={this.props.favoriteOnly}
              onChange={this.handleInStockInputChange}
            />
            Only show favorite pokemon
          </label>
        </p>
      </form>
    );
  }
}

export default Filters;
