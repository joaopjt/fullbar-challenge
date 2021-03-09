import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

import Pagination from './pagination'

import { Pokemons } from '../models';
import { UPDATE_POKEMONS, CHANGE_FILTER } from "../constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		loading: state.pokemons.loading,
		location: state.router.location,
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
		let Items = this.props.pokemons.map((pokemon, index) => {
			let link = '/' + pokemon.name;

			return (
				<li key={index} className={Stylesheet['c-list-item']}>
					<Link to={link}>
						<div className={Stylesheet['c-list-item__header']}>
							<img src={pokemon.image} className={Stylesheet['c-list-item__picture']} />
						</div>
						<div className={Stylesheet['c-list-item__details']}>
							<h3>{pokemon.name}</h3>
						</div>
					</Link>
				</li>
			)
		});

		return (
			<div className={(this.props.loading) ? Stylesheet['c-list.c-list--loading'] : Stylesheet['c-list'] }>
				{(!this.props.pokemons.length) ?
					<div className={Stylesheet['c-empty']}>
						<h3 className={Stylesheet['c-empty__message']}>Empty list!</h3>
					</div>
				:
					<ul className={Stylesheet['c-list__items']}>
						{Items}
					</ul>
				}

				<Pagination index={(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).page - 1) || this.props.filter.page}
					pages={parseInt(this.props.filter.length / this.props.filter.range)}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);