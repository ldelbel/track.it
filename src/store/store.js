import { createStore } from 'redux';
import menuReducer from '../reducers/menuReducer';

const store = createStore(menuReducer);

export default store;