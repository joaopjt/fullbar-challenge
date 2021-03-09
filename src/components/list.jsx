import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

import Pagination from './pagination'

import { Pokemons } from '../models';
import { LOADING, UPDATE_POKEMONS, CHANGE_FILTER } from "../constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		loading: state.pokemons.loading,
		location: state.router.location,
		page: parseInt(qs.parse(state.router.location.search, { ignoreQueryPrefix: true }).page) || 1,
		pokemons: state.pokemons.list,
	}
};

const mapDispatchToProps = dispatch => ({
    changeFilter: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { length: value }});
    },
    updateFilterPage: (endValue, pageValue) => {
    	dispatch({ type: CHANGE_FILTER, payload: { end: endValue, page: pageValue }});
    },
    loadingPokemons: () => {
    	dispatch({ type: LOADING });
    },
    updatePokemons: list => {
    	dispatch({ type: UPDATE_POKEMONS, payload: list });
    }
});

class List extends Component {
	constructor(props) {
		super(props);

		if (!this.props.pokemons.length) this.getPokemons();
	}

	componentDidUpdate() {
		if (this.props.pokemons.length && this.props.filter.end > this.props.pokemons.length) {
			let count = this.props.filter.end - this.props.pokemons.length;
			let offset = this.props.pokemons.length;

			this.getPokemons(count, offset);
		}

		if (this.props.filter.page !== this.props.page - 1)
			this.props.updateFilterPage(this.props.filter.end * this.props.page, this.props.page - 1);
	}

	getPokemons(limit = ((this.props.filter.end - this.props.filter.start) * this.props.filter.page), offset = this.props.filter.start) {
		let model = new Pokemons();

		if (limit) {
			this.props.loadingPokemons();

			model.get(`?limit=${limit}&offset=${offset}`)
				.then((res) => {
					let data = res.body.results;

					model.getImages(data)
						.then((r) => {
							this.props.updatePokemons(r);
						});
				});
		}
	}

	render() {
		let start = this.props.filter.range * this.props.filter.page;
		let end = start + this.props.filter.range;

		let pages = () => this.props.filter.end / this.props.filter.range;

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
			<div className={Stylesheet['c-list']}>
				{(!this.props.pokemons.length) ?
					<div className={Stylesheet['c-empty']}>
						<h3 className={Stylesheet['c-empty__message']}>Empty list!</h3>
					</div>
				:
					<ul className={Stylesheet['c-list__items']}>
						{(this.props.filter.pagination) ? Items.slice(start, end) : Items}
					</ul>
				}
				{ this.props.loading && (
					<p>Loading...</p>
				)}
				<Pagination index={this.props.page || this.props.filter.page}
					pages={(pages() > 1) ? parseInt(pages() + 1) : parseInt(pages())}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);