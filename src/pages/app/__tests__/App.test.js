import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import runReducer from '../../../reducers/runReducer';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteMatch: () => ({ url: '/app/' }),
}));

describe('app page',() => {
    it('renders correctly', () => {
        const store = createStore(runReducer);
        const app = renderer.create(
          <Provider store={store}>
            <App />
          </Provider>,
        ).toJSON();
        expect(app).toMatchSnapshot();
    });
})

