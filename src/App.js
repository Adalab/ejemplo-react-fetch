import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import Search from './Search';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterString: ''
    };
  }

  handleFilterChange = (filterString) => {
    this.setState({
      filterString
    });
  }

  render() {
    const numberOfPokemon = 50;
    const numbers = [...Array(numberOfPokemon).keys()].map(n => n + 1);

    return (
      <div>
        <Search onFilterChange={this.handleFilterChange} />
        {numbers.map(number =>
          <PokemonCard
            key={number}
            number={number}
            filterString={this.state.filterString}
          />
        )}
      </div>
    );
  }
}

export default App;
