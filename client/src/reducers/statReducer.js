import { GET_STATS, CLEAR_STATS } from '../actions/types';

const initalState = {
  stats: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        stats: action.payload
      };
    case CLEAR_STATS:
      return {
        ...state,
        stats: {}
      };
    default:
      return state;
  }
}
