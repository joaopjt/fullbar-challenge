import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: this.props.loading,
			pokemons: this.props.pokemons
		};
	}

	componentWillReceiveProps() {
		console.log(this.state);
		this.setState({ 
			loading: this.props.loading,
			pokemons: this.props.pokemons
		});
		console.log(this.state);
	}

	render() {
		return (
			<div className={(this.state.loading) ? 'c-list c-list--loading' : 'c-list'}>
				{!this.state.pokemons.lenght >= 1 ?
					<div className="c-empty">
						<h3 className="c-empty__message">Lista Vazia</h3>
					</div>
				:
					this.state.pokemons.map((pokemon) => {
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

// export default connect(mapStateToProps)(List);