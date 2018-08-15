import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

// INITIAL STATE

const initialState = {
  bots: [],
  selectedBot: {}
};

// ACTION TYPES

const GET_BOTS = 'GET_BOTS'; 
const GET_BOT = 'GET_BOT'; 

// ACTION CREATORS

export function getBots(bots) {
  const action = { type: GET_BOTS, payload: bots };
  return action;
}

export function getBot(bot) {
  const action = { type: GET_BOT, payload: bot };
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

export function fetchSingleBot(botName) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/${botName}`)
      .then(res => res.data)
      .then(bot => {
        const action = getBot(bot);
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
    case GET_BOT:
      return {
        ...state,
        selectedBot: action.payload
      };
    default:
      return state;
  }
}

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
);