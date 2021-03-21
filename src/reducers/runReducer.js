import { ADD_RUNNING_SESSION, SET_USER, FILL_LIST } from '../actions';

const initialState = {
  username: '',
  runningSessions: []
}

const runReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_RUNNING_SESSION:
      const newList = state.runningSessions.concat(action.payload)

      return {
        ...state,
        runningSessions: newList,
      };
    case SET_USER:
      return {
        ...state,
        username: action.payload,
      };
    case FILL_LIST:
      return {
        ...state,
        runningSessions: action.payload,
      };
    default:
      return state;
  }
}

export default runReducer;