import Stylesheet from './styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Filter from "./components/filter";
import List from "./components/list";
import Item from "./components/item";

const mapStateToProps = (state) => {
	return {
		location: state.router.location.pathname.replace('/', '')
	}
}

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={Stylesheet['b-container']}>
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

export default connect(mapStateToProps)(Main);