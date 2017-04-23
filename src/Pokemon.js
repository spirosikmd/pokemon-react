import React, {Component} from 'react';

class Pokemon extends Component {
  render() {
    return (
      <div>{this.props.pokemonData.name}</div>
    );
  }
}

export default Pokemon;
