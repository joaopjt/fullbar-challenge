import { UPDATE_POKEMONS } from '../constants';

const initialState = {
  loading: true,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case UPDATE_POKEMONS:
  		if (state.loading) return {...state, loading: false, list: action.payload };

     	return {
        ...state,
        list: action.payload
      };
      break;

  	default:
  		return state;
  };
};