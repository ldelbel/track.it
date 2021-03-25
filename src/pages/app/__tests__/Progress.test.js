import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Progress from '../progress';
import runReducer from '../../../reducers/runReducer';


jest.mock('../progress/Chart', () => 'Chart')

describe('progress component',() => {
    let running_sessions = [
        {
            id: 1,
            user: 'test1',
            distance: 1,
            duration: 1,
            start_time: 1616593525386,
            avg_speed: 1,
            avg_pace: 1,
            goal: 1,
        },{
            id: 2,
            user: 'test2',
            distance: 2,
            duration: 2,
            start_time: 1616593525386,
            avg_speed: 2,
            avg_pace: 2,
            goal: 2,
        }
    ]

    it('renders correctly', () => {
        const store = createStore(runReducer);
        const progress = renderer.create(
          <Provider store={store}>
            <Progress runningSessions={running_sessions} />
          </Provider>,
        ).toJSON();
        expect(progress).toMatchSnapshot();
    });
})