import React, { PureComponent } from 'react';
import { Form, Grid } from 'semantic-ui-react';

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
      <Grid columns={2}>
        <Grid.Column>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
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
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
}

export default Filters;
