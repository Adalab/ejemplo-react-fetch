import React, { Component } from 'react';
import Search from './Search';
import PokemonList from './PokemonList';

class App extends Component {
  constructor(props){
    super(props);
    const numberOfPokemon = 50;
    const numbers = [...Array(numberOfPokemon).keys()].map(n => n + 1);
    this.pokemons = numbers.map(number =>({
        id: number,
        name: ''
      }));
    this.state = {
      pokemons: this.pokemons,
      filter: ''
    };
  }

  handleFilterChange = query => {
    this.setState({
      filter: query,
      pokemons: this.filterPokemon(query)
    });
  }

  filterPokemon(query){
    return this.pokemons.filter(
      pokemon => pokemon.name.includes(query)
    )
  }

  componentDidMount(){
    const baseURL = 'http://pokeapi.co/api/v2/';
    const pokemonURL = num => `${baseURL}pokemon/${num}/`;

    this.pokemons.map( pokemon =>
      fetch(pokemonURL(pokemon.id))
      .then(response => {
        response.json()
        .then(json => {
          const{
            name,
            sprites: {front_default: image},
            types: [{type: {name: type}}]
          } = json;

          this.pokemons[pokemon.id - 1] = { ...pokemon, name, image, type };

          this.setState({
            pokemons: this.filterPokemon(this.state.filter)
          });
        });
      })
    );
  }

  render() {
    return (
      <div>
        <Search onFilterChange={this.handleFilterChange} />
        <PokemonList pokemons={this.state.pokemons} />
      </div>
    );
  }
}

export default App;
