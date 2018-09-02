import { GET_SCHEDULE } from '../actions/types';

const initalState = {};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_SCHEDULE:
      return action.payload;
    default:
      return state;
  }
}
