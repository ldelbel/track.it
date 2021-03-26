import { ADD_RUNNING_SESSION, SET_USER, FILL_LIST } from '../actions';

let initialState = {
  id: 0,
  username: '',
  runningSessions: [],
};

if (localStorage.user) {
  initialState = {
    id: localStorage.id,
    username: localStorage.user,
    runningSessions: JSON.parse(localStorage.runningSessions),
  };
}

const runReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RUNNING_SESSION:
      return {
        ...state,
        runningSessions: state.runningSessions.concat(action.payload),
      };
    case SET_USER:
      return {
        ...state,
        username: action.payload,
      };
    case FILL_LIST:
      return {
        ...state,
        id: action.payload[0],
        runningSessions: action.payload[1],
      };
    default:
      return state;
  }
};

export default runReducer;
