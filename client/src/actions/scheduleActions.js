import axios from 'axios';

import { GET_ERRORS, GET_SCHEDULE } from './types';

// Register User
export const getSchedule = country => dispatch => {
  axios
    .post('/api/schedule', country)
    .then(res =>
      dispatch({
        type: GET_SCHEDULE,
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
