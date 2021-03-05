import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Pokemon } from '../models';
import { ADD_POKEMON } from "../constants";

const mapStateToProps = (state) => {
	console.log('STATE');
	console.log(state);
	console.log('----');
	console.log('----');
	console.log('----');
	console.log('----');
	console.log('----');
	console.log('----');

	return {
		loading: state.pokemonsList.loading,
		pokemonsList: state.pokemonsList.list,
	}
}

class Item extends Component {
	constructor(props) {
		super(props);

		let { name, image, base_experience, abilities, specs } = this.props;
		this.state = { name, image, base_experience, abilities, specs };
	}

	async componentWillMount() {
		let pokemon = {
			name: this.props.pokemon
		};

		if (!this.props.pokemonsList[pokemon.name]) {
			let model = new Pokemon(pokemon.name);
			let pokemonDetails = await model.get();
			let pokemonAbilities = await model.getAbilities();

			Object.assign(pokemon, pokemonDetails, { abilities: pokemonAbilities });

			setTimeout(() => {
				this.props.dispatch({
					type: ADD_POKEMON,
					payload: pokemon
				});
			}, 500);
		}
	}

	render() {
		return (
			<div className="c-item" className={this.props.loading ? 'c-item--loading' : ''}>
				<div className="c-item__header">
					<h2 className="c-item__title">{ this.state.name }</h2>
					<span className="c-item__xp">{ this.state.xp }</span>
					<img src={this.props.image} />
				</div>
			</div>
		)
    }
}

export default connect(mapStateToProps)(Item);