import { CHANGE_FILTER } from '../constants';

const initialState = {
  start: 0,
  end: 1500,
  itens: 10,
  pagination: true
};

export default (state = initialState, action) => {
  switch (action) {
  	case CHANGE_FILTER:
      return Object.assign(...state, action.payload)
      break;

  	default:
  		return state;
  }
};