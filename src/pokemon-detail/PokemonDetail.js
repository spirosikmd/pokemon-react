import React, { PureComponent } from 'react';
import { Modal, Image, List, Step, Grid } from 'semantic-ui-react';

class PokemonDetail extends PureComponent {
  getDescriptionEvolutionGroupItem(evolutionRequirements) {
    return `${evolutionRequirements.amount} ${evolutionRequirements.name}`;
  }

  getOwnEvolutionGroupItem({ pokemon }) {
    return {
      title: pokemon.name,
      active: true,
      description: this.getDescriptionEvolutionGroupItem(
        pokemon.evolutionRequirements
      ),
    };
  }

  getEvolutionsStepGroupItems(evolutions) {
    let evolutionGroupItems = evolutions.map(evolution => {
      let data = { title: evolution.name };
      if (evolution.evolutionRequirements) {
        const description = this.getDescriptionEvolutionGroupItem(
          evolution.evolutionRequirements
        );
        data = Object.assign({}, { description }, data);
      }
      return data;
    });
    evolutionGroupItems = [
      this.getOwnEvolutionGroupItem(this.props),
      ...evolutionGroupItems,
    ];
    return evolutionGroupItems;
  }

  render() {
    const pokemon = this.props.pokemon;

    return (
      <Modal open={this.props.show} onClose={this.props.onCloseModal}>
        <Modal.Header>{pokemon.name}</Modal.Header>
        <Modal.Content image>
          <Image src={pokemon.image} width="190" height="160" />
          <Modal.Description>
            {pokemon.evolutions &&
              <Step.Group
                size="mini"
                items={this.getEvolutionsStepGroupItems(pokemon.evolutions)}
              />}
            <Grid columns={2} container>
              <Grid.Column>
                <List>
                  <List.Item>
                    <List.Header>Classification</List.Header>
                    {pokemon.classification}
                  </List.Item>
                  <List.Item>
                    <List.Header>Types</List.Header>
                    {pokemon.types.join(', ')}
                  </List.Item>
                  <List.Item>
                    <List.Header>Max HP</List.Header>
                    {pokemon.maxHP}
                  </List.Item>
                  <List.Item>
                    <List.Header>Max CP</List.Header>
                    {pokemon.maxCP}
                  </List.Item>
                  <List.Item>
                    <List.Header>Weight</List.Header>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </List.Item>
                  <List.Item>
                    <List.Header>Height</List.Header>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </List.Item>
                  {pokemon.habitat &&
                    <List.Item>
                      <List.Header>Habitat</List.Header>
                      {pokemon.habitat}
                    </List.Item>}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List>
                  <List.Item>
                    <List.Header>Resistant</List.Header>
                    {pokemon.resistant.join(', ')}
                  </List.Item>
                  <List.Item>
                    <List.Header>Weaknesses</List.Header>
                    {pokemon.weaknesses.join(', ')}
                  </List.Item>
                  <List.Item>
                    <List.Header>Flee rate</List.Header>
                    {pokemon.fleeRate}
                  </List.Item>
                  <List.Item>
                    <List.Header>Attacks</List.Header>
                    <ul>
                      {pokemon.attacks.fast.map(fastAttack => (
                        <li key={fastAttack.name}>
                          {fastAttack.name}
                          {' - '}
                          {fastAttack.type}
                          {' - '}
                          {fastAttack.damage}
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {pokemon.attacks.special.map(specialAttack => (
                        <li key={specialAttack.name}>
                          {specialAttack.name}
                          {' - '}
                          {specialAttack.type}
                          {' - '}
                          {specialAttack.damage}
                        </li>
                      ))}
                    </ul>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PokemonDetail;
