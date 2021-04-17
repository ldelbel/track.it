import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import runReducer from '../../../reducers/runReducer';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/app' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('app page', () => {
  const store = createStore(runReducer);

  it('renders correctly', () => {
    const app = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});
