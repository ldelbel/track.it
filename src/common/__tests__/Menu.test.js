import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Menu from '../components/Menu';
import MenuOption from '../components/MenuOption';
import '@testing-library/jest-dom/extend-expect';
import store from '../../store/store';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/app/',
  }),
}));

describe('menu component', () => {
  it('renders correctly', () => {
    const menu = renderer.create(<Menu />).toJSON();
    expect(menu).toMatchSnapshot();
  });

  it('contains MenuOptions as children', () => {
    const wrapper = shallow(<Menu store={store} />);
    expect(wrapper.containsMatchingElement(<MenuOption />)).toEqual(true);
  });
});
