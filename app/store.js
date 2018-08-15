import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

// INITIAL STATE

const initialState = {
  bots: [],
};

// ACTION TYPES

const GET_BOTS = 'GET_BOTS'; 

// ACTION CREATORS

export function getBots(bots) {
  const action = { type: GET_BOTS, payload: bots };
  return action;
}

// THUNK CREATORS

export function fetchBots() {
  return function thunk(dispatch) {
    return axios
      .get('/api')
      .then(res => res.data)
      .then(bots => {
        const action = getBots(bots);
        dispatch(action);
      });
  };
}


// REDUCER

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOTS:
      return {
        ...state,
        bots: action.payload
      };

    default:
      return state;
  }
}

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
);

//https://github.com/FullstackAcademy/stackchat/blob/day2-solution/client/store/index.js
