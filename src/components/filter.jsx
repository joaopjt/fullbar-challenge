import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_FILTER } from '../constants';

const mapStateToProps = (state) => {
	return {
		start: state.filter.start,
		end: state.filter.end,
		length: state.filter.length,
	}
};

const mapDispatchToProps = dispatch => ({
    updateStart: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { start: (value) ? parseInt(value) : '' }});
    },
    updateEnd: value => {
    	if (value >= )
    	dispatch({ type: CHANGE_FILTER, payload: { end: (value) ? parseInt(value) : '' }});
    }
});

const initialState = {
	rangeInvalid: false,
	errorMessage: `The end value should be less or equal to ${this.props.length}`
};

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	render() {
		return (
			<div className={(this.props.location) ? "c-filter c-filter--disabled" : "c-filter"}>
				<div className="c-filter__items">
					<div className="c-filter__item">
						<label htmlFor="min" className="c-filter__label">Start ({this.props.start})</label>
						<input id="min" name="min" className="c-filter__input" type="text" 
							defaultValue={this.props.start.toString()} onChange={(e) => { this.props.updateStart(e.target.value)}} />
					</div>
					<div className="c-filter__item">
						<label htmlFor="max" className="c-filter__label">End</label>
						<input id="max" name="max" className="c-filter__input" type="text" 
							defaultValue={this.props.end.toString()} onChange={(e) => { this.props.updateEnd(e.target.value)}} />
					</div>
					<div className="c-filter__item">
						<label htmlFor="range" className="c-filter__label">Range</label>
						<input id="range" name="range" className="c-filter__input" type="text" 
							defaultValue={this.props.end.toString()} onChange={(e) => { this.props.updateEnd(e.target.value)}} />
					</div>
				</div>
				{ this.state.rangeInvalid && return (
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