import { UPDATE_POKEMONS } from '../constants';

const initialState = {
  loading: true,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case UPDATE_POKEMONS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        list: Object.assign(state.list, action.payload)
      }
      break;

  	default:
  		return state;
  }
};