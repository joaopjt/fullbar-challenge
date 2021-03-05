import { ADD_POKEMONS } from '../constants';

const initialState = {
  loading: true,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case ADD_POKEMONS:
      return {
        ...state,
        loading: false,
        list: action.payload
      }
      break;

  	default:
  		return state;
  }
};