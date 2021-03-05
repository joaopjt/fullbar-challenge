import { CHANGE_FILTER } from '../constants';

const initialState = {
  start: 0,
  end: 20,
  max: 20
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case CHANGE_FILTER:
      return Object.assign(state, action.payload);
      break;

  	default:
  		return state;
  }
};