import { gql } from 'react-apollo';

export const AllPokemon = gql`
  query {
    pokemons(first: 151) {
      id
      name
      types
      image
      maxHP
      resistant
      habitat
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      classification
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      maxCP
      evolutions {
        name
        evolutionRequirements {
          amount
          name
        }
      }
      evolutionRequirements {
        amount
        name
      }
    }
  }
`;
