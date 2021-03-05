import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_FILTER } from '../constants';

const mapStateToProps = (state) => {
	return {
		start: state.filter.start,
		end: state.filter.end,
		max: state.filter.max,
	}
}

const mapDispatchToProps = dispatch => ({
    updateStart: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { start: (value) ? parseInt(value) : '' }});
    },
    updateEnd: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { end: (value) ? parseInt(value) : '' }});
    }
})


class Filter extends Component {
	constructor() {
		super();
		this.state = {
			start: 1,
			end: 15,
			max: 15,
		};
	}

	render() {
		return (
			<div className="c-filter">
				<div className="c-filter__item">
					<label htmlFor="min" className="c-filter__label">Inicio</label>
					<input id="min" name="min" className="c-filter__input" type="text" 
						defaultValue={this.props.start.toString()} onChange={(e) => { this.props.updateStart(e.target.value)}} />
				</div>
				<div className="c-filter__item">
					<label htmlFor="max" className="c-filter__label">Fim</label>
					<input id="max" name="max" className="c-filter__input" type="text" 
						defaultValue={this.props.end.toString()} onChange={(e) => { this.props.updateEnd(e.target.value)}} />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);