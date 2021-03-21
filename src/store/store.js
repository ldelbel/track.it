import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import runReducer from '../reducers/runReducer';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(runReducer, composedEnhancer);

export default store;