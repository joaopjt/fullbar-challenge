import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_FILTER } from '../constants';

const mapStateToProps = (state) => {
	return {
		start: state.filter.start,
		end: state.filter.end,
		lenght: state.filter.lenght,
	}
};

const mapDispatchToProps = dispatch => ({
    updateStart: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { start: (value) ? parseInt(value) : '' }});
    },
    updateEnd: value => {
    	dispatch({ type: CHANGE_FILTER, payload: { end: (value) ? parseInt(value) : '' }});
    }
});


class Filter extends Component {
	render() {
		return (
			<div className={(this.props.location) ? "c-filter c-filter--disabled" : "c-filter"}>
				<div className="c-filter__item">
					<label htmlFor="min" className="c-filter__label">Inicio ({this.props.start})</label>
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