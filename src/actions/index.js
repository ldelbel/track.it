const CHANGE_PAGE = 'CHANGE_PAGE';
const ADD_RUNNING_SESSION = 'ADD_RUNNING_SESSION';
const SET_USER = 'SET_USER';
const FILL_LIST = 'FILL_LIST';

const addRunningSession = session => ({
  type: ADD_RUNNING_SESSION,
  payload: session
});

const setUser = user => ({
  type: SET_USER,
  payload: user
});

const fillList = list => ({
  type: FILL_LIST,
  payload: list
});

const changePage = page => ({
  type: CHANGE_PAGE,
  payload: page,
});

export {
  addRunningSession,
  changePage,
  setUser,
  fillList,
  FILL_LIST,
  CHANGE_PAGE,
  ADD_RUNNING_SESSION,
  SET_USER
}