import React, { PureComponent } from 'react';

class Filters extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSearchTextInputChange = this.handleSearchTextInputChange.bind(
      this
    );
    this.handleMyPokemonInputChange = this.handleMyPokemonInputChange.bind(
      this
    );
  }

  handleSearchTextInputChange(event) {
    this.props.onSearchTextInput(event.target.value);
  }

  handleMyPokemonInputChange(event) {
    this.props.onMyPokemonInput(event.target.checked);
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
              checked={this.props.myPokemonOnly}
              onChange={this.handleMyPokemonInputChange}
            />
            Only show my pokemon
          </label>
        </p>
      </form>
    );
  }
}

export default Filters;
