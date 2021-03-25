import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Run from '../index';
import runReducer from '../../../reducers/runReducer';
import { addRunningSession } from '../../../actions';

describe('run page',() => {
    it('renders correctly', () => {
        const store = createStore(runReducer);
        const run = renderer.create(
          <Provider store={store}>
            <Run addRunningSession={addRunningSession} id={1} />
          </Provider>,
        ).toJSON();
        expect(run).toMatchSnapshot();
    });
})