import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from '../index';
import runReducer from '../../../reducers/runReducer';
import { setUser } from '../../../actions';

describe('login page', () => {
  it('renders correctly', () => {
    const store = createStore(runReducer);
    const login = renderer.create(
      <Provider store={store}>
        <Login setUser={setUser} />
      </Provider>,
    ).toJSON();
    expect(login).toMatchSnapshot();
  });
});
