import filter from './reducers/filter';
import pokemons from './reducers/pokemons';
import pokemonsList from './reducers/pokemonsList';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  filter,
  pokemons,
  pokemonsList,
  router: routerReducer
});