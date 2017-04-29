import React, { PureComponent } from 'react';
import { Modal, Image, Header } from 'semantic-ui-react';

class PokemonDetail extends PureComponent {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <Modal open={this.props.show} onClose={this.props.onCloseModal}>
        <Modal.Header>{pokemon.name}</Modal.Header>
        <Modal.Content image>
          <Image src={pokemon.image} />
          <Modal.Description>
            <Header>Details</Header>
            <dl>
              <dt>Classification</dt>
              <dd>{pokemon.classification}</dd>
              <dt>Types</dt>
              <dd>{pokemon.types.join(', ')}</dd>
            </dl>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PokemonDetail;
