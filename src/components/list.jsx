import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		loading: state.pokemons.loading,
		pokemons: state.pokemons.list,
	}
};

class List extends Component {

	render() {
		return (
			<div className={(this.props.loading) ? 'c-list c-list--loading' : 'c-list'}>
				{!this.props.pokemons.lenght >= 1 ?
					<div className="c-empty">
						<h3 className="c-empty__message">Lista Vazia</h3>
					</div>
				:
					this.props.pokemons.map((pokemon) => {
						let link = '/' + pokemon.name;

						return (
							<a className="c-list-item" href={link}>
								<div className="c-list-item__header">
									<img src={pokemon.image} className="c-list-item__picture" />
								</div>
								<div className="c-list-item__details">
									<h3>{pokemon.name}</h3>
								</div>
							</a>
						)
					})
				}

			</div>
		);
	}
}

export default connect(mapStateToProps)(List);