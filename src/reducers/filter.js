import { CHANGE_FILTER } from '../constants';

const initialState = {
  start: 0,
  end: 20,
  range: 20,
  length: 0,
  page: 0,
  pagination: true
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