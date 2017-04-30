import React, { PureComponent } from 'react';
import { Card, Image } from 'semantic-ui-react';
import pokeballImage from './pokeball.png';

const styles = {
  myPokemon: {
    opacity: 0.3,
  },
};

class PokemonCard extends PureComponent {
  handlePokemonClick(pokemon) {
    this.props.onPokemonClick(pokemon);
  }

  handleCatchClick(pokemonName) {
    this.props.onCatchClick(pokemonName);
  }

  getStyle(isMyPokemon) {
    let style = {
      boxShadow: '0 1px 3px 0 #D4D4D5, 0 0 0 1px #D4D4D5',
      borderRadius: '50%',
    };
    if (isMyPokemon) {
      style = Object.assign({}, styles.myPokemon, style);
    }
    return style;
  }

  render() {
    const pokemon = this.props.pokemon;

    return (
      <Card link onClick={() => this.handlePokemonClick(pokemon)}>
        <Image
          verticalAlign="middle"
          centered
          src={pokemon.image}
          style={{ margin: '20px auto' }}
          height={100}
        />
        <Card.Content>
          <Card.Header>
            {pokemon.name}
          </Card.Header>
          <Card.Description>
            {pokemon.classification}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Image
            centered
            size="mini"
            src={pokeballImage}
            style={this.getStyle(this.props.isMyPokemon)}
            onClick={event => {
              event.stopPropagation();
              this.handleCatchClick(pokemon.name);
            }}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default PokemonCard;
