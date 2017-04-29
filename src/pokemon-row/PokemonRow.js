import React, { PureComponent } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import pokeballImage from './pokeball.png';

const styles = {
  myPokemon: {
    color: 'red',
  },
};

class PokemonRow extends PureComponent {
  handlePokemonClick(pokemonName) {
    this.props.onPokemonClick(pokemonName);
  }

  handleCatchClick(pokemonName) {
    this.props.onCatchClick(pokemonName);
  }

  getStyle(isMyPokemon) {
    return isMyPokemon ? Object.assign({}, styles.myPokemon) : {};
  }

  render() {
    const pokemon = this.props.pokemon;

    return (
      <Card>
        <Image
          size="small"
          verticalAlign="middle"
          centered
          src={pokemon.image}
          style={{ margin: '20px auto' }}
          onClick={() => this.handlePokemonClick(pokemon.name)}
        />
        <Card.Content>
          <Card.Header>
            {pokemon.name}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              max hp: {pokemon.maxHP}
            </span>
          </Card.Meta>
          <Card.Description>
            {pokemon.classification}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            icon
            color="teal"
            onClick={() => this.handleCatchClick(pokemon.name)}
          >
            <Image centered size="mini" src={pokeballImage} />
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default PokemonRow;
