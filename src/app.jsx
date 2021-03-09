import Stylesheet from './styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Filter from "./components/filter";
import List from "./components/list";
import Item from "./components/item";

import { Pokemons } from './models';
import { CHANGE_FILTER } from "./constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		location: state.router.location.pathname.replace('/', '')
	}
}

const mapDispatchToProps = dispatch => ({
    initFilter: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { length: value }});
    }
});

class Main extends Component {
	constructor(props) {
		super(props);

		let model = new Pokemons();

		model.get(`?limit=1`)
			.then((res) => {
				this.props.initFilter(res.body.count);
			});
	}

	render() {
		return (
			<div>
				<Filter location={this.props.location} />
				<Switch>
					<Route exact path="/" component={() => {
						return (<List />)
					}} />
					<Route path="/:pokemon" component={() => {
						return (<Item pokemon={this.props.location} />);
					}} />
				</Switch>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);