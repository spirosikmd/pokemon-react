import React, { PureComponent } from 'react';
import { Input } from 'semantic-ui-react';

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
          <Input
            type="text"
            placeholder="Search..."
            value={this.props.searchText}
            onChange={this.handleSearchTextInputChange}
          />
        </label>
        <label>
          <Input
            type="checkbox"
            checked={this.props.myPokemonOnly}
            onChange={this.handleMyPokemonInputChange}
          />
          Only show my pokemon
        </label>
      </form>
    );
  }
}

export default Filters;
