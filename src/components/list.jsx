import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    	dispatch({ type: CHANGE_FILTER, payload: { length: value }});
    },
    updatePokemons: list => {
    	dispatch({ type: UPDATE_POKEMONS, payload: list });
    }
});

class List extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		this.getPokemons();
	}

	getPokemons() {
		let model = new Pokemons();

		model.get(`?limit=${this.props.filter.end - this.props.filter.start}&offset=${this.props.filter.start}`)
			.then((res) => {
				let data = res.body.results;

				model.getImages(data)
					.then((r) => {
						this.props.updatePokemons(r);
					});
			});
	}

	tooglePagination() {

	}

	render() {
		return (
			<div className={(this.props.loading) ? 'c-list c-list--loading' : 'c-list'}>
				{(!this.props.pokemons.length) ?
					<div className="c-empty">
						<h3 className="c-empty__message">Empty list!</h3>
					</div>
				:
					this.props.pokemons.map((pokemon, index) => {
						let link = '/' + pokemon.name;

						return (
							<Link key={index} className="c-list-item" to={link}>
								<div className="c-list-item__header">
									<img src={pokemon.image} className="c-list-item__picture" />
								</div>
								<div className="c-list-item__details">
									<h3>{pokemon.name}</h3>
								</div>
							</Link>
						)
					})
				}

				<div className="c-pagination">
					{
						let 
					}
					<ol>

					</ol>
					<button className="c-pagination__see-all" onClick={this.tooglePagination}>See All</button>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);