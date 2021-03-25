import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import History from '../history';
import runReducer from '../../../reducers/runReducer';

describe('history component',() => {
    let running_sessions = [
        {
            id: 1,
            user: 'test1',
            distance: 1,
            duration: 1,
            avg_speed: 1,
            avg_pace: 1,
            goal: 1,
        },{
            id: 2,
            user: 'test2',
            distance: 2,
            duration: 2,
            avg_speed: 2,
            avg_pace: 2,
            goal: 2,
        }
    ]

    it('renders correctly', () => {
        const store = createStore(runReducer);
        const history = renderer.create(
          <Provider store={store}>
            <History runningSessions={running_sessions} />
          </Provider>,
        ).toJSON();
        expect(history).toMatchSnapshot();
    });
})