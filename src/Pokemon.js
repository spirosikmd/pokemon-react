import React, {Component} from 'react';
import ReactModal from 'react-modal';

class Pokemon extends Component {
  render() {
    return (
      <ReactModal isOpen={this.props.show} contentLabel="Pokemon details">
        <section>
          <h1>{this.props.pokemon.name}</h1>
        </section>
        <section>
          <h2>abilities</h2>
          <ul>
            {this.props.pokemon.abilities.map(ability =>
              <li key={ability.ability.name}>{ability.ability.name}</li>
            )}
          </ul>
        </section>
        <section>
          <h2>forms</h2>
          <ul>
            {this.props.pokemon.forms.map(form =>
              <li key={form.name}>{form.name}</li>
            )}
          </ul>
        </section>
        <button onClick={this.props.onCloseModal}>Close Modal</button>
      </ReactModal>
    );
  }
}

export default Pokemon;
