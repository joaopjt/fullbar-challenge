import Stylesheet from './styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { push } from 'react-router-redux';

import Filter from "./components/filter";
import List from "./components/list";
import Item from "./components/item";

import { Pokemons } from './models';
import { ADD_POKEMONS } from "./constants";

const mapStateToProps = (state) => {
	return {
		location: state.router.location.pathname.replace('/', ''),
		loadingPokemons: state.pokemons.loading,
		pokemons: state.pokemons.list,
	}
}

class App extends Component {
	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		if (this.props.loadingPokemons) {
			let model = new Pokemons();
			let data = await model.get('?limit=5');
			let pokemons = await model.getImages(data);

			setTimeout(() => {
				this.props.dispatch({
					type: ADD_POKEMONS,
					payload: pokemons
				});
			}, 250);
		}
	}

	render() {
		return (
			<div>
				<Filter />
				<Switch>
					<Route exact path="/" component={() => ( <List loading={this.props.loadingPokemons} pokemons={this.props.pokemons} /> )} />
					<Route path="/:pokemon" component={() => {
						return (<Item loading="true" pokemon={this.props.location} />);
					}} />
				</Switch>
			</div>
		)
	}
}

export default connect(mapStateToProps)(App);