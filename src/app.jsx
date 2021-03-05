import Stylesheet from './styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Filter from "./components/filter";
import List from "./components/list";
import Item from "./components/item";

import { Pokemons } from './models';
import { UPDATE_POKEMONS, CHANGE_FILTER } from "./constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		location: state.router.location.pathname.replace('/', ''),
		loadingPokemons: state.pokemons.loading,
		pokemons: state.pokemons.list,
	}
}

class App extends Component {
	componentDidMount() {
		if (this.props.loadingPokemons) {
			let model = new Pokemons();

			model.get(`?limit=${this.props.filter.end}&offset=${this.props.filter.start}`)
				.then((res) => {
					let data = res.body.results;

					this.props.dispatch({
						type: CHANGE_FILTER,
						payload: { max: res.body.count }
					});

					model.getImages(data)
						.then((r) => {
							this.props.dispatch({
								type: UPDATE_POKEMONS,
								payload: r
							});
						});
				});
		}
	}

	render() {
		return (
			<div>
				<Filter />
				<Switch>
					<Route exact path="/" component={() => {
						return (<List loading={this.props.loadingPokemons} pokemons={this.props.pokemons} />)
					}} />
					<Route path="/:pokemon" component={() => {
						return (<Item pokemon={this.props.location} />);
					}} />
				</Switch>
			</div>
		)
	}
}

export default connect(mapStateToProps)(App);