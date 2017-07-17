import React, { Component } from 'react';
import './PokemonCard.css';

const baseURL = 'http://pokeapi.co/api/v2/';

const pokemonURL = num => `${baseURL}pokemon/${num}/`;

class PokemonCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: this.props.number,
      name: ''
    };
  }

  componentDidMount(){
    fetch(pokemonURL(this.state.number))
    .then(response => {
      response.json()
      .then(json => {
        const{
          name,
          id,
          sprites: {front_default: image},
          types: [{type: {name: type}}]
        } = json;
        this.setState({
          name,
          id,
          image,
          type
        });
      });
    });
  }

  render() {
    if(!this.state.name.includes(this.props.filterString)){
      return null;
    }
    return (
      <span className='card'>
        <p>{this.state.id}</p>
        <p>{this.state.name}</p>
        <p>Type {this.state.type}</p>
        <img src={this.state.image} alt={this.state.name} />
      </span>
    );
  }
}

export default PokemonCard;
