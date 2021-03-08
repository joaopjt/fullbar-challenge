import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Pokemons } from '../models';
import { UPDATE_POKEMONS, CHANGE_FILTER } from "../constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		loading: state.pokemons.loading,
		pokemons: state.pokemons.list,
	}
};

const mapDispatchToProps = dispatch => ({
    changeFilter: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { max: value }});
    },
    updatePokemons: list => {
    	dispatch({ type: UPDATE_POKEMONS, payload: list });
    }
});


class List extends Component {
	constructor(props) {
		super(props);

		this.getPokemons();
	}

	getPokemons() {
		let model = new Pokemons();

		model.get(`?limit=${this.props.filter.end}&offset=${this.props.filter.start}`)
			.then((res) => {
				let data = res.body.results;

				model.getImages(data)
					.then((r) => {
						this.props.updatePokemons(r);
					});
			});
	}

	render() {
		return (
			<div className={(this.props.loading) ? 'c-list c-list--loading' : 'c-list'}>
				{!this.props.pokemons.lenght >= 1 ?
					<div className="c-empty">
						<h3 className="c-empty__message">Lista Vazia</h3>
					</div>
				:
					this.props.pokemons.map((pokemon) => {
						let link = '/' + pokemon.name;

						return (
							<a className="c-list-item" href={link}>
								<div className="c-list-item__header">
									<img src={pokemon.image} className="c-list-item__picture" />
								</div>
								<div className="c-list-item__details">
									<h3>{pokemon.name}</h3>
								</div>
							</a>
						)
					})
				}

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);