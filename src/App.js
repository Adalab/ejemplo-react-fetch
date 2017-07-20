import React, { Component } from 'react';
import Search from './Search';
import PokemonList from './PokemonList';

class App extends Component {
  constructor(props){
    super(props);
    const numberOfPokemon = 50;
    const numbers = [...Array(numberOfPokemon).keys()].map(n => n + 1);
    const pokemons = numbers.map(number =>({
        id: number,
        name: ''
      }));
    this.state = {
      pokemons,
      filter: ''
    };
  }

  handleFilterChange = query => {
    this.setState({
      filter: query
    });
  }

  filterPokemon(){
    return this.state.pokemons.filter(
      pokemon => pokemon.name.includes(this.state.filter)
    )
  }

  componentDidMount(){
    const baseURL = 'http://pokeapi.co/api/v2/';
    const pokemonURL = num => `${baseURL}pokemon/${num}/`;

    this.state.pokemons.map( pokemon =>
      fetch(pokemonURL(pokemon.id))
        .then(response =>
          response.json()
        )
        .then(json => {
          const{
            name,
            sprites: {front_default: image},
            types: [{type: {name: type}}]
          } = json;

          const pokemons = [...this.state.pokemons];
          pokemons[pokemon.id - 1] = { ...pokemon, name, image, type };

          this.setState({
            pokemons
          });
        })
    );
  }

  render() {
    return (
      <div>
        <Search onFilterChange={this.handleFilterChange} />
        <PokemonList pokemons={this.filterPokemon()} />
      </div>
    );
  }
}

export default App;
