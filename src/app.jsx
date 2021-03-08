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
    changeFilter: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { max: value }});
    }
});

class Main extends Component {
	constructor(props) {
		super(props);

		let model = new Pokemons();

		model.get(`?limit=${this.props.filter.end}&offset=${this.props.filter.start}`)
			.then((res) => {
				let data = res.body.results;

				this.props.changeFilter(res.body.count);
			});
	}

	render() {
		return (
			<div>
				<Filter />
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