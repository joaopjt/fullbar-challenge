import React, { Component } from 'react';

export default class List extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const pokemons = this.props.pokemons;

		return (
			<div className="c-list" className={this.props.loading ? 'c-list--loading' : ''}>
			
				{(!this.props.loading) ?
					(pokemons.length = 0) ?
						<div className="c-empty">
							<h3 className="c-empty__message">Lista Vazia</h3>
						</div>
					:
						pokemons.map(pokemon => (
							<div className="c-list-item">
								<div className="c-list-item__header">
									<img src={pokemon.image} className="c-list-item__picture" />
								</div>
								<div className="c-list-item__details">
									<h3>{pokemon.name}</h3>
								</div>
							</div>
						))
				:
					null
				}

			</div>
		);
	}
}