import React from 'react';
import renderer from 'react-test-renderer';
import New from '../new';

describe('new component', () => {
  it('renders correctly', () => {
    const newc = renderer.create(<New />).toJSON();
    expect(newc).toMatchSnapshot();
  });
});
