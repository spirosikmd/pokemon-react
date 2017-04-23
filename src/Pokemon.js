import React, {PureComponent} from 'react';
import ReactModal from 'react-modal';

class Pokemon extends PureComponent {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <ReactModal isOpen={this.props.show} contentLabel="Pokemon details">
        <section>
          <h1>{pokemon.name}</h1>
          <dl>
            <dt>weight</dt>
            <dd>{pokemon.weight}</dd>
            <dt>height</dt>
            <dd>{pokemon.height}</dd>
            <dt>experience</dt>
            <dd>Defeating {pokemon.name} will give you {pokemon.base_experience} xp!</dd>
            <dt>order</dt>
            <dd>{pokemon.order}</dd>
            <dt>species</dt>
            <dd>{pokemon.species.name}</dd>
          </dl>
        </section>
        <section>
          <h2>abilities</h2>
          <ul>
            {pokemon.abilities.map(ability =>
              <li key={ability.ability.name}>{ability.ability.name}</li>
            )}
          </ul>
        </section>
        <section>
          <h2>forms</h2>
          <ul>
            {pokemon.forms.map(form =>
              <li key={form.name}>{form.name}</li>
            )}
          </ul>
        </section>
        <button onClick={this.props.onCloseModal}>close</button>
      </ReactModal>
    );
  }
}

export default Pokemon;
