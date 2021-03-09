import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Pokemons } from '../models';
import { CHANGE_FILTER } from '../constants';

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
};

const mapDispatchToProps = dispatch => ({
	initFilter: value => {
		dispatch({ type: CHANGE_FILTER, payload: { length: value }});
	},
    updateStart: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { start: (value) ? parseInt(value) : 0 }});
    },
    updateEnd: (value, length) => {
    	if (value >= length) return this.setState({ invalidLenght: true });

    	dispatch({ type: CHANGE_FILTER, payload: { end: (value) ? parseInt(value) : 20 }});
    }
});

const initialState = {
	invalidLenght: false,
	errorMessage: `Error at length.`
};

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	componentDidMount() {
		let model = new Pokemons();

		model.get(`?limit=1`)
			.then((res) => {
				this.props.initFilter(res.body.count);
				this.setState({ errorMessage: `The end value should be less or equal to ${this.props.length}`});
			});
	}

	render() {
		return (
			<div className={(this.props.location) ? "c-filter c-filter--disabled" : "c-filter"}>
				<div className="c-filter__items">
					<div className="c-filter__item">
						<label htmlFor="start" className="c-filter__label">Start ({this.props.filter.start})</label>
						<input id="start" name="start" className="c-filter__input" type="text" 
							defaultValue={this.props.filter.start.toString()} onChange={(e) => { this.props.updateStart(e.target.value)}} />
					</div>
					<div className="c-filter__item">
						<label htmlFor="end" className="c-filter__label">End</label>
						<input id="end" name="end" className="c-filter__input" type="text" 
							defaultValue={this.props.filter.end.toString()} onChange={(e) => { this.props.updateEnd(e.target.value, this.props.length)}} />
					</div>
					<div className="c-filter__item">
						<label htmlFor="range" className="c-filter__label">Range</label>
						<select id="range" name="range" className="c-filter__select"
							defaultValue={this.props.filter.range.toString()} onChange={(e) => { this.props.updateRange(e.target.value)}}>
							<option disabled>Select one option</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
						</select>
					</div>
				</div>
				{ this.state.invalidLenght && (
						<div className="c-filter__warnings">
							<span className="c-filter__error">{this.state.errorMessage}</span>
						</div>
					)
				}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);