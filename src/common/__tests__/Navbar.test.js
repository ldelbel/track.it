import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../components/Navbar';

describe('navbar component', () => {
  it('renders correctly', () => {
    const navbar = renderer.create(<Navbar />).toJSON();
    expect(navbar).toMatchSnapshot();
  });
});
