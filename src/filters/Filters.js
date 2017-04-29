import React, { PureComponent } from 'react';
import { Form } from 'semantic-ui-react';

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

  handleMyPokemonInputChange(event, { checked }) {
    this.props.onMyPokemonInput(checked);
  }

  render() {
    return (
      <Form>
        <Form.Input
          label="Name"
          type="text"
          placeholder="Search by name..."
          value={this.props.searchText}
          onChange={this.handleSearchTextInputChange}
        />
        <Form.Checkbox
          checked={this.props.myPokemonOnly}
          onChange={this.handleMyPokemonInputChange}
          label="Only show my pokemon"
        />
      </Form>
    );
  }
}

export default Filters;
