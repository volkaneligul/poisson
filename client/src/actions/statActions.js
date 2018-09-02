import axios from 'axios';

import { GET_ERRORS, GET_STATS, CLEAR_STATS } from './types';

// Register User
export const getStats = data => dispatch => {
  axios
    .post('/api/stats', data)
    .then(res =>
      dispatch({
        type: GET_STATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearStats = data => dispatch => {
  dispatch({
    type: CLEAR_STATS
  });
};
